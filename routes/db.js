const { Router } = require('express');
const { Category, MenuCategory, Menu, Store } = require('../db/models');


const router = Router();

router.post('/category', async(req, res)=>{
    const { list } = req.body;

    for (i of list) {
        await Category.create({ name: i });
    }

    res.json({ message: "SUCCESS" });
})

router.post('/store', async(req, res)=>{
    const { stores } = req.body;

    await Store.bulkCreate(stores);

    res.json({ message: "SUCCESS" });
});


router.post('/menucategory', async(req, res)=>{
    const { mc } = req.body;
    
    for (i of mc) {
        MenuCategory.create({ name: i });
    }
    
    res.json({ message: "SUCCESS" });
});

router.post('/menu', async(req, res)=>{
    const { menuList } = req.body;

    await Menu.bulkCreate(menuList);

    res.json({ message: "SUCCESS" });
});


module.exports = router;