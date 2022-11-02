const { StoreService, ReviewService, LikeService } = require('../services');

class StoreController {
  //매장 상세페이지 조회 //findStore 옆에 리뷰 리스트 넣기
  DetailStore = async (req, res, next) => {
    try {
      const { storeId } = req.params;
      const { userId } = req.app.locals.user;

      const store = await StoreService.DetailStore(storeId, userId);
      const reviews = await ReviewService.findReview(storeId);

      await StoreService.updateScore(storeId);

      res.status(200).json({ store, reviews });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: '매장 상세 보기 에러' });
    }
  };

  toggleLike = async (req, res, next) => {
    try {
      const { storeId } = req.params;
      const { userId } = req.app.locals.user;

      const result = await LikeService.toggleLike(storeId, userId);

      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: false });
    }

  };
}

module.exports = new StoreController();
