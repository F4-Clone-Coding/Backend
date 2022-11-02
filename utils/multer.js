const multer = require('multer');
const multerS3 = require('multer-s3');
//const multerS3 = require('multer-s3-transform');
const aws = require('aws-sdk');
// const sharp = require('sharp');
require('dotenv').config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECURITY_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: true,
    acl: 'public-read',
    key: function (req, file, cb) {
      //let extension = path.extname(file.originalname);
      //cb(null, Date.now().toString() + extension);
      cb(null, `${file.fieldname}/${file.originalname}`); // S3에서 field 폴더 안에 이미지 업로드
    },
  }),
});

module.exports = upload;
