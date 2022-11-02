const { StoreRepo } = require('../repositories');

class StoreServices {
  //매장 상세 페이지 조회
  DetailStore = async (storeId) => {
    //조회수
    await StoreRepo.views(storeId);
    //상세 조회
    const find = await StoreRepo.DetailStore(storeId);
    return find;
  };
}

module.exports = new StoreServices();
