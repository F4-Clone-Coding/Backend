const { ReviewRepo } = require("../repositories");
const { InvalidParamsError } = require("../utils/exception");

class ReviewService {
  //PUT store/:storeId/review
  createReview = async (userId, storeId, review) => {
    const createdReview = await ReviewRepo.createReview(
      userId,
      storeId,
      review
    );
    if (!createdReview) throw InvalidParamsError("게시글 생성 실패");

    return createdReview;
  };

  //GET store/:storeId
  findReview = async (storeId) => {
    const reviews = await ReviewRepo.findReview(storeId);
    return reviews;
  };

  //DELETE store/:storeId/:reviewId
  deleteReview = async (userId, reviewId) => {
    const deleted = await ReviewRepo.deleteReview(userId, reviewId);
    if (deleted) {
      return true;
    } else if (!deleted) {
      return false;
    }
  };
}

module.exports = new ReviewService();
