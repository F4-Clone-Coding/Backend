const data = require('./menuData.js');
const { Category, Store, Menu } = require('./db/models');

let newData = data.map((v) => {
  return {
    name: v['REST_NM'],
    categoryId: v['TOB_INFO'],
    // menuList: v['MENU_KOR_ADD_INFO'],
    // price: v['MENU_AMT'],
    location: `${v['LAT']}, ${v['LOT']}`,
    storePhone: v['TELNO'],
    openHrInfo: v['OPEN_HR_INFO'] === '' ? '매일 17:00~24:00 일요일휴무' : v['OPEN_HR_INFO'],
  };
});

newData.forEach((v) => {
  switch (v.categoryId) {
    case '중식':
      v.categoryId = 1;
      break;
    case '한식':
      v.categoryId = 2;
      break;
    case '양식':
      v.categoryId = 3;
      break;
    case '분식':
      v.categoryId = 4;
      break;
    case '카페·디저트':
      v.categoryId = 5;
      break;
    case '일식':
      v.categoryId = 6;
      break;
    case '치킨':
      v.categoryId = 7;
      break;
    case '패스트푸드':
      v.categoryId = 8;
      break;
    case '브런치':
      v.categoryId = 9;
      break;
    case '기타':
      v.categoryId = 10;
      break;
    case '아시안':
      v.categoryId = 11;
      break;
    case '야식':
      v.categoryId = 12;
      break;
  }
});

// newData = newData.filter((v) => v.price !== '');
// newData.forEach((v, i) => {
// v.menuList = v.menuList.replaceAll("'", '');
// v.menuList = v.menuList.slice(1, v.menuList.length - 1).split(', ');
// v.price = v.price.slice(1, v.price.length - 1).split(', ');
// if (v.openHrInfo.length > 0) v.openHrInfo = v.openHrInfo.split(' ');
// });

for (i = 0; i < newData.length; i++) {
  try {
    Store.create({
      name: newData[i].name,
      categoryId: newData[i].categoryId,
      storePhone: newData[i].storePhone,
      location: newData[i].location,
      openHrInfo: newData[i].openHrInfo.length > 100 ? '매일 17:00~24:00 일요일휴무' : newData[i].openHrInfo,
    });
  } catch (error) {
    console.log(error);
    i++;
  } finally {
    continue;
  }
}

module.exports = newData;
