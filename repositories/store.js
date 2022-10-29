const { Store, Menu} = require('../models')

  class StoreRepositories {


  //매장살세페이지 조회
  DetailStore = async (storeId) =>{
    console.log(storeId)
    return await Store.findAll({where : {storeId},include : {model : Menu}})
  }

  }

module.exports = StoreRepositories
