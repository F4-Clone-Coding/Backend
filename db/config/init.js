const storeData = require('../../data.json');
const axios = require('axios');
const { Category, Store } = require('../models');


async function createCategories() {
    const list = ['중식', '한식', '양식', '분식', '카페·디저트', '일식', '치킨', '패스트푸드', '브런치', '기타', '아시안', '야식'];

    for (i of list) {
        await Category.create({ name: i });
    }
}


async function createStores() {
    console.log(storeData.length);

    const category = {
        '중식': 1,
        '한식': 2,
        '양식': 3,
        '분식': 4,
        '카페·디저트': 5,
        '일식': 6,
        '치킨': 7,
        '패스트푸드': 8,
        '기타': 10,
        '아시안': 11,
        '야식': 12,
    }

    for (let i=0; i+100<=20000; i+=100) {
        // console.log(storeData[i].REST_NM);

        const stores = storeData.slice(i, i+100).map((store)=>{
            return {
                name: store.REST_NM,
                categoryId: category[store.TOB_INFO] || 10,
                location: `${store.LAT}, ${store.LOT}`,
                contact: store.TELNO,
                openHour: store.OPEN_HR_INFO || '매일 17:00~24:00 일요일휴무',                
            }
        });
        await Store.bulkCreate(stores);

        // const { data } = await axios({
        //     method: "POST",
        //     url: "https://mignon-mh.shop/test",
        //     data: { stores }
        // });

        console.log(i, i+100);
    }
}


(async()=>{
    await createCategories();
    console.log('CATEGORIES CREATED');
    await createStores();
    console.log('STORES CREATED');
})();