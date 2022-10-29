const { StoreRepo } = require("../repositories");


class StoreServices{
  
  //매장 상세 페이지 조회
  DetailStore = async(storeId)=>{
    const find = await StoreRepo.DetailStore(storeId)
    return find
  }

}

module.exports = new StoreServices();
