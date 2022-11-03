const sequelize = require('../db/config/connection');
const { setArea } = require('../utils/listing/coords');


class CategoryRepository {

  //전체 카테 고리 조회
  findAllCategories = async ([userX, userY]) =>{
    const { minX, maxX, minY, maxY } = setArea(userX, userY);
    const k = Date.now().toString().at(7) % 2;

    return await sequelize.query(`
      SELECT * FROM Stores
      WHERE storeId % 2 = ${k}
      AND X BETWEEN ${minX} AND ${maxX}
      AND Y BETWEEN ${minY} AND ${maxY}
      ORDER BY score DESC;
    `)
  };

  //카테고리에 해당하는 매장 조회
  findOneCategory = async (categoryId, [userX, userY]) =>{
    const { minX, maxX, minY, maxY } = setArea(userX, userY);
    const k = Date.now().toString().at(7) % 2;

    return await sequelize.query(`
      SELECT * FROM Stores
      WHERE categoryId = ${categoryId}
      AND storeId % 2 = ${k}
      AND X BETWEEN ${minX} AND ${maxX}
      AND Y BETWEEN ${minY} AND ${maxY}
      ORDER BY score DESC;
    `)
  };

}

module.exports = new CategoryRepository();
