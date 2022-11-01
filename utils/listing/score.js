const { coordDistance } = require('./coords');
const { StoreRepo, OrderRepo } = require('../../repositories');


class Score {
    
    viewOrderRatio = async function(viewTotal, viewRecent, storeId) {
        const orderTotal = await OrderRepo.orderTotalCount(storeId);
        const orderRecent = await OrderRepo.orderRecentCount(storeId);
        
        const totalRatio = orderTotal / viewTotal;
        const recentRatio = orderRecent / viewRecent;
        
        return totalRatio + 2*recentRatio;
    }

    timeSinceListing = function(createdAt) {
        const apvDate = new Date(createdAt).getTime();
        const nowDate = new Date().getTime();

        return (nowDate - apvDate) / (1000*60*60*24);
    }

    scoreBase = (store) => {
        const { storeId, viewTotal, viewRecent, createdAt } = store;

        const R = this.viewOrderRatio(viewTotal, viewRecent, storeId);
        const T = this.timeSinceListing(createdAt);

        return (14 / T) * R;
    }

    scoreDistance = function(store, userLocation) {
        const { location, score } = store;
        const distance = coordDistance(location, userLocation);

        const log = Math.log10;
        const D = 30*log(3000-distance) - 10*log(distance+10);

        return D * score;
    }

}


module.exports = new Score();