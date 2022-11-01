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
    return await Store.findAll({
      where: { storeId },
      include: { model: Menu },
    });
  };
  //초기화하기
  resetview = async () => {
    await Store.update({ viewRecent: 0 }, { where: {} });
  };
}

module.exports = new StoreRepository();
