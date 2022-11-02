const { Review } = require("../db/models");
const { Op } = require("sequelize");

class ReviewRepository extends Review {
  constructor() {
    super();
  }

  createReview = async function (userId, storeId, review) {
    return Review.create({ userId, storeId, review });
  };

  findReview = async function (storeId) {
    return await Review.findOne({ where: { storeId } });
  };

  deleteReview = async function (userId, reviewId) {
    return await Review.destroy({ where: { userId, reviewId } });
  };
}

module.exports = new ReviewRepository();
