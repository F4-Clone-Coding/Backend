const StoreRepository = require("../repositories/store");

  class StoreServices{

    storerepository = new StoreRepository();
    
    //매장 상세 페이지 조회
    DetailStore = async(storeId)=>{
      const find = await this.storerepository.DetailStore(storeId)
      return find
    }
  
  }

module.exports = StoreServices;
