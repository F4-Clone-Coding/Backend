const data = require('./menuData');
const { MenuCategory, Category, Store, Menu } = require('./db/models');

let newData = data.map((v) => {
  return {
    name: v['REST_NM'],
    categoryId: v['TOB_INFO'],
    menuList: v['MENU_KOR_ADD_INFO'],
    price: v['MENU_AMT'],
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

newData = newData.filter((v) => v.price !== '');
newData.forEach((v, i) => {
  v.menuList = v.menuList.replaceAll("'", '');
  v.menuList = v.menuList.slice(1, v.menuList.length - 1).split(', ');
  v.price = v.price.slice(1, v.price.length - 1).split(', ');
  if (v.name.includes('인생죽')) {
    v.name = v.name.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '');
    // console.log(v.name);
  }

  // if (v.openHrInfo.length > 0) v.openHrInfo = v.openHrInfo.split(' ');
});

// console.log(newData.slice(0, 10));

let menuPrice = [];

newData.map((v, j) => {
  for (i = 0; i < v['price'].length; i++) {
    let menu = [];

    menu[0] = [v.name, v.menuList[i]];
    menu[1] = v['price'][i].length > 6 ? 100000 : +v['price'][i];
    // v.price[] = v[1].length > 6 ? 100000 : +v[1];
    menu[2] = j + 1;
    menuPrice.push(menu);
  }
});

// console.log(menuPrice.slice(0, 50));

// let allmenus = menuPrice.map((v) => v[0][1]);
// console.log(allmenus.slice(100, 200));
let newList = [];

menuPrice.map((v, i) => {
  if (v[0][1].includes('파스타')) newList.push(12);
  else if (v[0][1].includes('피자')) newList.push(13);
  else if (v[0][1].includes('스테이크')) newList.push(14);
  else if (v[0][1].includes('버거')) newList.push(15);
  else if (v[0][1].includes('치킨')) newList.push(16);
  else if (v[0][1].includes('샐러드')) newList.push(17);
  else if (v[0][1].includes('라떼')) newList.push(18);
  else if (v[0][1].includes('아메리카노')) newList.push(18);
  else if (v[0][1].includes('아인슈')) newList.push(18);
  else if (v[0][1].includes('에이드')) newList.push(19);
  else if (v[0][1].includes('티')) newList.push(20);
  else if (v[0][1].includes('케이크')) newList.push(21);
  else if (v[0][1].includes('빵')) newList.push(21);
  else if (v[0][1].includes('스시')) newList.push(8);
  else if (v[0][1].includes('카레')) newList.push(11);
  else if (v[0][1].includes('초밥')) newList.push(9);
  else if (v[0][1].includes('튀김')) newList.push(7);
  else if (v[0][1].includes('볶음밥')) newList.push(3);
  else if (v[0][1].includes('덮밥')) newList.push(3);
  else if (v[0][1].includes('볶음')) newList.push(3);
  else if (v[0][1].includes('스무디')) newList.push(19);
  else if (v[0][1].includes('찌개')) newList.push(2);
  else if (v[0][1].includes('탕수육')) newList.push(22);
  else if (v[0][1].includes('콜드')) newList.push(18);
  else if (v[0][1].includes('탕')) newList.push(2);
  else if (v[0][1].includes('멘')) newList.push(4);
  else if (v[0][1].includes('까스')) newList.push(10);
  else if (v[0][1].includes('회')) newList.push(8);
  else if (v[0][1].includes('알밥')) newList.push(5);
  else if (v[0][1].includes('쿠키')) newList.push(21);
  else if (v[0][1].includes('국수')) newList.push(4);
  else if (v[0][1].includes('우동')) newList.push(4);
  else if (v[0][1].includes('야끼')) newList.push(4);
  else if (v[0][1].includes('살')) newList.push(22);
  else if (v[0][1].includes('농어')) newList.push(8);
  else if (v[0][1].includes('도미')) newList.push(8);
  else if (v[0][1].includes('우럭')) newList.push(8);
  else if (v[0][1].includes('청국장')) newList.push(2);
  else if (v[0][1].includes('찜')) newList.push(2);
  else if (v[0][1].includes('떡볶이')) newList.push(22);
  else if (v[0][1].includes('짜장면')) newList.push(22);
  else if (v[0][1].includes('순대탕')) newList.push(2);
  else if (v[0][1].includes('순대')) newList.push(22);
  else if (v[0][1].includes('국밥')) newList.push(5);
  else if (v[0][1].includes('게티')) newList.push(12);
  else if (v[0][1].includes('조림')) newList.push(22);
  else if (v[0][1].includes('고기')) newList.push(22);
  else if (v[0][1].includes('게장')) newList.push(22);
  else if (v[0][1].includes('롤')) newList.push(22);
  else if (v[0][1].includes('소바')) newList.push(4);
  else if (v[0][1].includes('떡볶이')) newList.push(22);
  else newList.push(1);
});

const asdf = menuPrice.map((v, i) => {
  return {
    storeId: v[2],
    menuCategoryId: newList[i],
    name: v[0][1].length > 40 ? '인생죽' : v[0][1],
    price: v[1],
  };
});

asdf.forEach((v, i) => {
  if (v.name && v.price && v.menuCategoryId) {
    // Menu.create(v);
    console.log(v);
  }
});
// (async () => {
//   await createCategories();
//   console.log('CATEGORIES CREATED');
//   await createStores();
//   console.log('STORES CREATED');
// })();
