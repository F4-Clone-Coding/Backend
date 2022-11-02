const { coordDistance } = require('./coords');
const { StoreRepo, OrderRepo } = require('../../repositories');


class Score {
    
    scoreBase = async(store) => {
        const { storeId, viewTotal, viewRecent, createdAt } = store;

        const R = await this.#viewOrderRatio(viewTotal, viewRecent, storeId);
        const T = this.#timeSinceListing(createdAt);

        return (14 / T) * R;
    }

    scoreDistance = function(store, userLocation) {
        const { location, score } = store;
        const distance = coordDistance(location, userLocation);

        const log = Math.log10;
        const D = 30*log(3000-distance) - 10*log(distance+10);

        return D * score;
    }

    randomViewCount = () => {
        const rng = Math.random;

        const n = ( this.#randomSkewNormal(rng, 50, 25, -1) )
        const N = n > 0 ? n : Math.random()*10;
        const R = ( (Math.random() * 10 + 1) * 0.8 );

        return (N * R)|0;
    }

    scoreForCreation = (viewTotal, viewRecent, createdAt) => {
        if (viewRecent === 0) viewRecent++;
        const orderTotal = viewTotal > ( this.randomViewCount() * 0.2 )|0
            ? ( this.randomViewCount() * 0.2 )|0 : (viewTotal * Math.random())|0;
        const orderRecent = orderTotal > ( this.randomViewCount() *0.2 * 0.7 )|0
            ? ( this.randomViewCount() *0.2 * 0.7 )|0 : (orderTotal * Math.random())|0;

        const totalRatio = orderTotal / viewTotal || 0.5;
        const recentRatio = orderRecent / viewRecent || 0.5;
        const R = totalRatio + 2*recentRatio;
        const T = this.#timeSinceListing(createdAt) || 7;

        return (14 / T) * R;
    }

    #viewOrderRatio = async function(viewTotal, viewRecent, storeId) {
        if (viewRecent === 0) viewRecent++;
        const orderTotal = await OrderRepo.orderTotalCount(storeId);
        const orderRecent = await OrderRepo.orderRecentCount(storeId);
        
        const totalRatio = orderTotal / viewTotal || 0.5;
        const recentRatio = orderRecent / viewRecent || 0.5;
        
        return totalRatio + 2*recentRatio;
    }

    #timeSinceListing = function(createdAt) {
        const apvDate = new Date(createdAt).getTime();
        const nowDate = new Date().getTime();

        return (nowDate - apvDate) / (1000*60*60*24);
    }

    #randomNormals = function(rng) {
        let u1 = 0, u2 = 0;
        //Convert [0,1) to (0,1)

        while (u1 === 0) u1 = rng();
        while (u2 === 0) u2 = rng();

        const R = Math.sqrt(-2.0 * Math.log(u1));
        const Θ = 2.0 * Math.PI * u2;

        return [R * Math.cos(Θ), R * Math.sin(Θ)];
    };

    #randomSkewNormal = (rng, mean, deviation, shape = 0) => {
        const [u0, v] = this.#randomNormals(rng);
        if (shape === 0) {
            return mean + deviation * u0;
        }
        const r = shape / Math.sqrt(1 + shape * shape);
        const u1 = r * u0 + Math.sqrt(1 - r * r) * v;
        const z = u0 >= 0 ? u1 : -u1;
        return mean + deviation * z;
    };

}


module.exports = new Score();