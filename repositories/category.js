const { Category, Store } = require('../db/models')

class CategoryRepository {

  //전체 카테 고리 조회
  findAllCategories = async (page) =>{
    return await Store.findAll({
      limit: 10,
      offset: 10*page,
      order: [['score', 'desc']]
    })
  }
  //카테고리에 해당하는 매장 조회
  findOneCategory = async (categoryId, page) =>{
    return await Store.findAll({
      where: { categoryId },
      limit: 10,
      offset: 10*page,
    })
  }

}

module.exports = new CategoryRepository();
