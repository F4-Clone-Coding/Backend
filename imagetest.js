// const { Router } = require('express');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const path = require('path');

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
        imageUrl: process.env.AWS_DEFAULT_URL + encodeURIComponent(v.Key),
        menuCategoryId: parseInt(v.Key.slice(10, 12)),
      });
  });

  // console.log(menulist);
  //메뉴 업데이트
  async function updatesMenu() {
    const dd = await Menu.findAll({});
    // console.log(dd.length);
    const imageUrl = menulist.map((x) => {
      return {
        imageUrl: x.imageUrl,
      };
    });
    const menuCategoryId = menulist.map((x) => {
      return {
        menuCategoryId: x.menuCategoryId,
      };
    });
    // console.log(imageUrl);
    const data = JSON.stringify(imageUrl);
    fs.writeFileSync(path.join(__dirname, 'MenuimageUrl.json'), data);
  }

  const storeLists = [];

  data.Contents.map((v) => {
    if (v.Key.slice(0, 1) == 's') {
      storeLists.push({
        imageUrl: process.env.AWS_DEFAULT_URL + encodeURIComponent(v.Key),
        storeId: parseInt(v.Key.slice(10, 12)),
      });
    }
  });

  async function updates() {
    // console.log(dd.length);
    const imageUrl = storeLists.map((x) => {
      return {
        imageUrl: x.imageUrl,
      };
    });
    const StoreId = storeLists.map((x) => {
      return {
        StoreId: x.storeId,
      };
    });
    console.log(imageUrl);
    // const data = JSON.stringify(imageUrl);
    // fs.writeFileSync(path.join(__dirname, 'storeimageUrl.json'), data);
    // const datas = JSON.stringify(StoreId);
    // fs.writeFileSync(path.join(__dirname, 'StoreId.json'), datas);
  }
  // 스토어 올리기
  // async function updates() {
  //   const store = storeLists.map((x) => {
  //     return {
  //       imageUrl: x.imageUrl,
  //     };
  // });
  //   const dd = await Store.findAll({});

  // console.log(imageUrl);
  // const data = JSON.stringify(menuCategoryId);

  //   for (let i = 0; i < dd.length; i++) {
  //     await Store.update(store[i % 12], { where: { storeId: i + 1 } });
  //   }
  // }

  (async () => {
    // await updates();
    // console.log('END2');
    await updatesMenu();
    console.log('END');
  })();
});
