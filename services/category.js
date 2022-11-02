const { CategoryRepo } = require("../repositories");


class CategoryServices {

//전체 카테 고리 조회
findAllCategories = async (page, [userX, userY]) =>{
  const result = await CategoryRepo.findAllCategories(page, [userX, userY]);
  const list = 10;

  return result.slice(page*list, (page+1)*list)
}
//카테고리에 해당하는 매장 조회
findOneCategory = async (categoryId, page, [userX, userY]) =>{
  const result = await CategoryRepo.findOneCategory(categoryId, page, [userX, userY])
  const list = 10;

  return result.slice(page*list, (page+1)*list)
}

}

module.exports = new CategoryServices();
