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

  resetview = async () => {
    //월요일 1
    if (new Date().getDay() == 1 && new Date().getHours() == 0) {
      await StoreRepo.resetview();
    }
  };
}

module.exports = new StoreServices();
