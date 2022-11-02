const { Store, Menu } = require('../db/models');

class StoreRepository {
  //조회수
  views = async (storeId) => {
    await Store.increment({ viewTotal: 1 }, { where: { storeId } });
    await Store.increment({ viewRecent: 1 }, { where: { storeId } });
  };

  //매장살세페이지 조회
  DetailStore = async (storeId) => {
    console.log();
    return await Store.findOne({
      where: { storeId },
      include: { model: Menu },
    });
  };

  //초기화하기
  resetview = async () => {
    await Store.update({ viewRecent: 0 }, { where: {} });
  };

  findStore = async function(storeId) {
    return await Store.findOne({ where: { storeId } });
  }

  updateScore = async function(storeId, score) {
    return await Store.update({ score }, {
      where: { storeId }
    });
  }
}

module.exports = new StoreRepository();
