const storeData = require('./data');
const apvDate = require('./apvDate');
const storeImg = require('./storeimageUrl');
const menuImg = require('./menuImg');
const axios = require('axios');
const { Category, Store, MenuCategory, Menu } = require('../db/models');
const { randomViewCount, scoreForCreation } = require('../utils/listing/score');


(async()=>{
    await createCategories();
    console.log('CATEGORIES CREATED');
    await sleep(3000);

    await createStores();
    console.log('STORES CREATED');
    await sleep(3000);

    await createMenuCategories();
    console.log('MENUCATEGORIES CREATED');
    await sleep(3000);

    await createMenus();
    console.log('MENUS CREATED');
})();


function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}


async function createCategories() {
    const list = ['중식', '한식', '양식', '분식', '카페·디저트', '일식', '치킨', '패스트푸드', '브런치', '기타', '아시안', '야식'];

    // 서버용
    // await axios({
    //     method: "POST",
    //     url: "https://mignon-mh.shop/db/category",
    //     data: { list }
    // });

    // 로컬용
    for (i of list) {
        await Category.create({ name: i });
    }
}


async function createStores() {

    const category = {
        '중식': 1,
        '한식': 2,
        '양식': 3,
        '분식': 4,
        '카페·디저트': 5,
        '일식': 6,
        '치킨': 7,
        '패스트푸드': 8,
        '브런치': 9,
        '기타': 10,
        '아시안': 11,
        '야식': 12,
    }

    for (let i=0; i+100<=20000; i+=100) {
        // console.log(storeData[i].REST_NM);

        const stores = storeData.slice(i, i+100).map((store)=>{
            const n = ( Math.random() * 482000)|0;
            const viewTotal = randomViewCount();
            const viewRecent = viewTotal > ( randomViewCount() * 0.1 )|0
                ? ( randomViewCount() * 0.1 )|0 : (viewTotal * Math.random())|0;
            const createdAt = apvDate[n][n+1];
            const score = scoreForCreation(viewTotal, viewRecent, createdAt);

            return {
                name: store.REST_NM,
                categoryId: category[store.TOB_INFO] || 10,
                contact: store.TELNO,
                imageUrl: storeImg[i%12]?.imageUrl,
                openHour: store.OPEN_HR_INFO || '매일 17:00~24:00 일요일휴무',
                X: (Number(store.LAT) * 10**7)|0,
                Y: (Number(store.LOT) * 10**7)|0,
                viewTotal,
                viewRecent,
                score,
                createdAt,
            }
        });

        // console.log(stores);
        // 로컬용
        await Store.bulkCreate(stores);


        // // 서버용
        // const { data } = await axios({
        //     method: "POST",
        //     url: "https://mignon-mh.shop/db/store",
        //     data: { stores }
        // });


        console.log(i, i+100);
    }
}


async function createMenuCategories() {
    const mc = [
        '기타',        '찌개&탕',
        '덮밥&볶음밥', '면류',
        '밥류',        '볶음류',
        '튀김류',      '스시',
        '초밥',        '돈까스',
        '카레',        '파스타',
        '피자',        '스테이크',
        '햄버거',      '치킨',
        '샐러드',      '커피',
        '음료',        '티',
        '디저트',      '메인메뉴',
        '사이드메뉴'
    ]
    
    // 로컬용
    for (i of mc) {
        MenuCategory.create({ name: i });
    }

    // //서버용
    // await axios({
    //     method: "POST",
    //     url: "https://mignon-mh.shop/db/menucategory",
    //     data: { mc }
    // });

}

async function createMenus() {
    const category = {
        '중식': 1,
        '한식': 2,
        '양식': 3,
        '분식': 4,
        '카페·디저트': 5,
        '일식': 6,
        '치킨': 7,
        '패스트푸드': 8,
        '브런치': 9,
        '기타': 10,
        '아시안': 11,
        '야식': 12
    }

    const stores = storeData.filter((v) => v.price !== '');

    let newData = stores.map((v) => {
        const menus = v['MENU_KOR_ADD_INFO'].replaceAll("'", '');
        return {
            name: v['REST_NM'].includes('인생죽') 
                ? v['REST_NM'].replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '') 
                : v['REST_NM'],
            categoryId: category[v['TOB_INFO']],
            menus: menus.slice(1, -1).split(', '),
            price: v['MENU_AMT'].slice(1, -1).split(', '),
        };
    });

    let menuPrice = [];

    newData.map((v, j) => {
        for (i = 0; i < v['price'].length; i++) {
            let menu = [];

            menu[0] = [v.name, v.menus[i]];
            menu[1] = v['price'][i].length > 6 ? 100000 : +v['price'][i];
            // v.price[] = v[1].length > 6 ? 100000 : +v[1];
            menu[2] = j + 1;
            menuPrice.push(menu);
        }
    });

    let menuCategoryList = [];

    menuPrice.map((v, i) => {
        const menu = v[0][1];
        if (menu.match(/청국장|찜|찌개|탕/)) menuCategoryList.push(2);
        else if (menu.match(/볶음밥|덮밥|볶음/)) menuCategoryList.push(3);
        else if (menu.match(/멘|국수|우동|소바|야끼/)) menuCategoryList.push(4);
        else if (menu.match(/국밥|알밥/)) menuCategoryList.push(5);
        else if (menu.match(/튀김/)) menuCategoryList.push(7);
        else if (menu.match(/스시|농어|도미|우러|회/)) menuCategoryList.push(8);
        else if (menu.match(/초밥/)) menuCategoryList.push(9);
        else if (menu.match(/까스/)) menuCategoryList.push(10);
        else if (menu.match(/카레/)) menuCategoryList.push(11);
        else if (menu.match(/파스타|게티/)) menuCategoryList.push(12);
        else if (menu.match(/피자/)) menuCategoryList.push(13);
        else if (menu.match(/스테이크/)) menuCategoryList.push(14);
        else if (menu.match(/버거/)) menuCategoryList.push(15);
        else if (menu.match(/치킨/)) menuCategoryList.push(16);
        else if (menu.match(/샐러드/)) menuCategoryList.push(17);
        else if (menu.match(/라떼|아메리카노|아인슈|콜드/)) menuCategoryList.push(18);
        else if (menu.match(/에이드|스무디/)) menuCategoryList.push(19);
        else if (menu.match(/티/)) menuCategoryList.push(20);
        else if (menu.match(/케이크|빵|쿠키/)) menuCategoryList.push(21);
        else if (menu.match(/탕수육|살|떡볶이|짜장면|게장|순대|조림|고기|롤/)) menuCategoryList.push(22);
        else menuCategoryList.push(1);
    });


    const menuList = menuPrice.map((v, i) => {
        const menuCategoryId = menuCategoryList[i];
        const list = menuImg[menuCategoryId]
        const n = ( Math.random() * list.length )|0;

        return {
            name: v[0][1].length > 40 ? '인생죽' : v[0][1],
            storeId: v[2],
            price: v[1] ? v[1] : 50000,
            menuCategoryId,
            image: list[n]
        };
    });

    // // 서버용
    // for (let i=0; i<menuList.length; i+=100) {
    //     await axios({
    //         method: "POST",
    //         url: "https://mignon-mh.shop/db/menu",
    //         data: { menuList: menuList.slice(i, i+100) }
    //     })
    //     console.log(i, i+100);
    // }

    // 로컬용
    for (let i=0; i<menuList.length; i+=100) {
        await Menu.bulkCreate(menuList.slice(i, i+100))
        console.log(i, i+100);
    }
}
