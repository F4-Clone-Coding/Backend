// const { Router } = require('express');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
const { SelectParametersFilterSensitiveLog } = require('@aws-sdk/client-s3');
const S3 = require('aws-sdk/clients/s3');
// const router = Router();
require('dotenv').config();
const { Store, Menu } = require('../db/models');
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
  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
  data.Contents.map((v) => {
    if (v.Key.slice(0, 1) == 'm')
      menulist.push({
        imageUrl: process.env.AWS_DEFAULT_URL + v.Key,
        menuCategoryId: parseInt(v.Key.slice(10, 12)),
      });
  });
  async function updatesMenu() {
    const store = storeLists.map((x) => {
      return {
        imageUrl: x.imageUrl,
      };
    });
    // console.log(store);
    const mm = await Menu.findAll({ where: { menuCategoryId: 1 } });
    const 
    // for (let i = 0; i < dd.length; i++) {
    //   await Menu.update(store[i % 12], { where: { storeId: i + 1 } });
    //   sleep(1000);
    // }
  }

  (async () => {
    await updatesMenu();
    console.log('ddd');
  })();
  // console.log(menulist);

  const storeLists = [];

  data.Contents.map((v) => {
    if (v.Key.slice(0, 1) == 's') {
      storeLists.push({
        imageUrl: process.env.AWS_DEFAULT_URL + v.Key,
        storeId: parseInt(v.Key.slice(10, 12)),
      });
    }
  });
  // function getRandomInt(max) {
  //   return Math.floor(Math.random() * max);
  // }

  async function updates() {
    const store = storeLists.map((x) => {
      return {
        imageUrl: x.imageUrl,
      };
    });
    // console.log(store);
    const dd = await Store.findAll({});

    for (let i = 0; i < dd.length; i++) {
      await Store.update(store[i % 12], { where: { storeId: i + 1 } });
      sleep(1000);
    }
  }

  (async () => {
    await updates();
    console.log('ddd');
  })();
});
