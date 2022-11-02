const { StoreRepo, LikeRepo } = require('../repositories');
const { scoreBase } = require('../utils/listing/score');

class StoreServices {
  //매장 상세 페이지 조회
  DetailStore = async (storeId, userId) => {
    //조회수
    await StoreRepo.views(storeId);
    //상세 조회
    const store = await StoreRepo.DetailStore(storeId);
    const like = await LikeRepo.findOne(storeId, userId);

    return Object.assign(store.get(), { like: Boolean(like) });
  };

  resetview = async () => {
    //월요일 1
    if (new Date().getDay() == 1 && new Date().getHours() == 0) {
      await StoreRepo.resetview();
    }
  };

  updateScore = async function(storeId) {
    const store = await StoreRepo.findStore(storeId);
    const score = await scoreBase(store)
    const result = await StoreRepo.updateScore(storeId, score);

    switch (result[0]) {
      case 1:
          return true;
      default:
          return false;
    }
  }
}

module.exports = new StoreServices();
