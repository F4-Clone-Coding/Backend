// const MeetingsService = require('../services/meetings.service');
// const ImagesService = require('../services/images.service');
const aws = require('aws-sdk');
require('dotenv').config();

class ImagesController {
  // imagesService = new ImagesService();

  //배열로 들어온 다수의 이미지 업로드. 1개여도 이 코드가 호출되도록 함.
  uploadImages = async (req, res, next) => {
    try {
      const images = req.files;
      const imageUrls = images.map((img) => img.location);
      const menuCategoryId = req.files.fieldname;

      if (!images) {
        throw new Error();
      }

      res.status(200).send(imageUrls);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
module.exports = ImagesController;
