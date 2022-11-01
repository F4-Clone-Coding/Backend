const { CategoryRepo } = require("../repositories");


class CategoryServices {

//전체 카테 고리 조회
findAllCategories = async (page) =>{
  return await CategoryRepo.findAllCategories(page);
}
//카테고리에 해당하는 매장 조회
findOneCategory = async (categoryId, page) =>{
  return await CategoryRepo.findOneCategory(categoryId, page)
}

}

module.exports = new CategoryServices();
