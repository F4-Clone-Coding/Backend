const { Menu, MenuCategory } = require('../db/models');

class MenuRepository {
    findOne = async function(menuId) {
        return await Menu.findOne({
            where: { menuId },
            attributes: {
                exclude: ['storeId', 'menuCategoryId']
            },
            include: {
                model: MenuCategory,
                attributes: ['name']
            }
        });
    }

}

module.exports = new MenuRepository();