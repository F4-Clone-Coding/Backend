// const { Router } = require('express');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
const S3 = require('aws-sdk/clients/s3');
// const router = Router();
require('dotenv').config();
const { Store, Menu } = require('./db/models');
//* aws region 및 자격증명 설정
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECURITY_KEY,
  region: process.env.AWS_REGION,
});

var bucketParams = {
  Bucket: process.env.AWS_BUCKET,
};

s3.listObjects(bucketParams, function (err, data) {
  const menulist = [];

  data.Contents.map((v) => {
    if (v.Key.slice(0, 1) == 'm')
      menulist.push({
        imageUrl: process.env.AWS_DEFAULT_URL + v.Key,
        menuCategoryId: parseInt(v.Key.slice(10, 12)),
      });
  });

  console.log(menulist);
  // async function updatesMenu() {
  //   const dd = await Menu.findAll({});
  //   console.log(dd.length);
  //   const imageUrl = storeLists.map((x) => {
  //     return {
  //       imageUrl: x.imageUrl,
  //     };
  //   });
  //   const menuCategoryId = storeLists.map((x) => {
  //     return {
  //       menuCategoryId: x.menuCategoryId,
  //     };
  //   });
  //   for (let i = 0; i < dd.length; i++) {
  //     await Store.update(imageUrl, { where: menuCategoryId });
  //   }
  // }
  // const storeLists = [];

  // data.Contents.map((v) => {
  //   if (v.Key.slice(0, 1) == 's') {
  //     storeLists.push({
  //       imageUrl: process.env.AWS_DEFAULT_URL + v.Key,
  //       storeId: parseInt(v.Key.slice(10, 12)),
  //     });
  //   }
  // });

  //스토어 올리기
  // async function updates() {
  //   const store = storeLists.map((x) => {
  //     return {
  //       imageUrl: x.imageUrl,
  //     };
  //   });
  //   const dd = await Store.findAll({});

  //   for (let i = 0; i < dd.length; i++) {
  //     await Store.update(store[i % 12], { where: { storeId: i + 1 } });
  //   }
  // }

  (async () => {
    // await updates();
    // console.log('ddd');
    await updatesMenu();
    console.log('END');
  })();
});
