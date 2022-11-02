const { Op } = require('sequelize');
const { Category, Store } = require('../db/models');
const { squareBox } = require('../utils/listing/coords');


class CategoryRepository {

  //전체 카테 고리 조회
  findAllCategories = async (page, [userX, userY]) =>{
    const { minX, maxX, minY, maxY } = squareBox(userX, userY);

    return await Store.findAll({
      where : {
        X: {
          [Op.between]: [minX, maxX]
        },
        Y: {
          [Op.between]: [minY, maxY]
        }
      },
      order: [['score', 'desc']]
    });
  };

  //카테고리에 해당하는 매장 조회
  findOneCategory = async (categoryId, page, [userX, userY]) =>{
    const { minX, maxX, minY, maxY } = squareBox(userX, userY);

    return await Store.findAll({
      where: { 
        categoryId,
        X: {
          [Op.between]: [minX, maxX]
        },
        Y: {
          [Op.between]: [minY, maxY]
        }
      },
      order: [['score', 'desc']]
    });
  };

}

module.exports = new CategoryRepository();
