const storeData = require('./data');
const apvDate = require('./apvDate');
const axios = require('axios');
const { Category, Store, MenuCategory, Menu } = require('../db/models');


function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}


async function createCategories() {
    const list = ['중식', '한식', '양식', '분식', '카페·디저트', '일식', '치킨', '패스트푸드', '브런치', '기타', '아시안', '야식'];

    // // 서버용
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
            return {
                name: store.REST_NM,
                categoryId: category[store.TOB_INFO] || 10,
                location: `${store.LAT}, ${store.LOT}`,
                contact: store.TELNO,
                openHour: store.OPEN_HR_INFO || '매일 17:00~24:00 일요일휴무',
                createdAt: apvDate[n][n+1]              
            }
        });


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
    //     data: { list }
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
        menuList = v['MENU_KOR_ADD_INFO'].replaceAll("'", '');
        return {
            name: v['REST_NM'].includes('인생죽') 
                ? v['REST_NM'].replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '') 
                : v['REST_NM'],
            categoryId: category[v['TOB_INFO']],
            menuList: menuList.slice(1, -1).split(', '),
            price: v['MENU_AMT'].slice(1, -1).split(', '),
        };
    });

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
            name: v[0][1].length > 40 ? '인생죽' : v[0][1],
            storeId: v[2],
            price: v[1] ? v[1] : 50000,
            menuCategoryId: newList[i],
        };
    });

    // // 서버용
    // for (let i=0; i<asdf.length; i+=100) {
    //     await axios({
    //         method: "POST",
    //         url: "https://mignon-mh.shop/db/menu",
    //         data: { menuList: asdf }
    //     })
    //     await createData(asdf.slice(i, i+100))
    //     console.log(i);
    //   }

    // 로컬용
    for (let i=0; i<asdf.length; i+=100) {
        await Menu.bulkCreate(asdf.slice(i, i+100))
        console.log(i);
    }
}

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