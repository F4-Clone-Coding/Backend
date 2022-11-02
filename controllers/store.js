const { StoreService, ReviewService } = require('../services');

class StoreController {
  //매장 상세페이지 조회 //findStore 옆에 리뷰 리스트 넣기
  DetailStore = async (req, res, next) => {
    try {
      const { storeId } = req.params;
      const findStore = await StoreService.DetailStore(storeId);
      const reviews = await ReviewService.findReview(storeId);

      await StoreService.updateScore(storeId);
      res.status(200).send({ data : findStore, reviews : reviews});
    } catch (error) {
      console.log(error);
      res.status(400).send({ msg: '매장 상세 보기 에러' });
    }
  };
}

module.exports = new StoreController();
