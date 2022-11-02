const CategoryRepo = require('./category');
const MenuRepo = require('./menu'); 
const OrderRepo = require('./order');
const StoreRepo = require('./store');
const UserRepo = require('./user');
const ReviewRepo = require('./review')
const LikeRepo = require('./like');



module.exports = { 
    CategoryRepo, 
    MenuRepo, 
    OrderRepo, 
    StoreRepo, 
    UserRepo, 
    ReviewRepo, 
    LikeRepo 
};