const CategoryRepositories= require("../repositories/category.js");

  class CategoryServices {

    categoryrepositories = new CategoryRepositories();
  //전체 카테 고리 조회
  findAllCategories = async () =>{
    return await this.categoryrepositories.findAllCategories()
  }
  //카테고리에 해당하는 매장 조회
  findOneCategory = async (categoryId) =>{
    return await this.categoryrepositories.findOneCategory(categoryId)
  }

  }

module.exports = CategoryServices;
