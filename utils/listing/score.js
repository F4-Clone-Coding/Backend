

/**
 * 
 * viewTotal, viewRecent
 * orderTotal, orderRecent
 * createdAt
 * location
 * 
 */

const { coordDistance } = require('./coords');
const { StoreRepo, OrderRepo } = require('../../repositories');

class Score {
    
    viewOrderRatio = async function(viewTotal, viewRecent, storeId) {
        const order = await OrderRepo.orderTotalCount(storeId);
        return order;
    }

    timeSinceListing = function(createdAt) {
        // createdAt = 'xxxx. xx. xx'
        const apvDate = new Date(createdAt).getTime();
        const nowDate = new Date().getTime();

        // time past by day
        return (nowDate - apvDate) / (1000*60*60*24);
    }

    scoreBase = function(store) {
        const { viewTotal, viewRecent, location, createdAt } = store;
    }

    scoreDistance = function() {}

}




module.exports = new Score();