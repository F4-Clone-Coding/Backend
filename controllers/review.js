const { ReviewService } = require("../services");
const { InvalidParamsError } = require("../utils/exception");

class ReviewController {
    //PUT store/:storeId/review
    createReview = async (req, res, next) => {
      try {
       const storeId = req.params.storeId
       const { userId } = req.app.locals.user
       const { review } = req.body

       if(!storeId || !review) throw InvalidParamsError('입력값이 없습니다.')

        const createdReview = await ReviewService.createReview(userId, storeId, review)
        const { reviewId } = createdReview
        res.status(200).json({
            reviewId : reviewId,
            message: "SUCCESS",
          });

      } catch (error) {
        next(error)
      }
    };

    //DELETE store/:storeId/:reviewId
    deleteReview = async( req, res, next ) => {
        try {
            const reviewId = req.params.reviewId
            const { userId } = req.app.locals.user
     
            if(!userId || !reviewId) throw InvalidParamsError('입력값이 없습니다.')
     
             const result = await ReviewService.deleteReview(userId, reviewId)
             res.json({
                 result: result
               });
     
           } catch (error) {
             next(error)
           }
    }
  }
  
  module.exports = new ReviewController();
  