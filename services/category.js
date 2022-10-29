const { CategoryRepo } = require("../repositories");


class CategoryServices {

//전체 카테 고리 조회
findAllCategories = async () =>{
  return await CategoryRepo.findAllCategories()
}
//카테고리에 해당하는 매장 조회
findOneCategory = async (categoryId) =>{
  return await CategoryRepo.findOneCategory(categoryId)
}

}

module.exports = new CategoryServices();
