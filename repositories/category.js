const { Category, Store } = require('../db/models')

class CategoryRepositories {

//전체 카테 고리 조회
findAllCategories = async () =>{
  return await Category.findAll({include : {model : Store}})
}
//카테고리에 해당하는 매장 조회
findOneCategory = async (categoryId) =>{
  return await Category.findAll({where : { categoryId },include : {model : Store}})
}

}

module.exports = new CategoryRepositories();
