const { CategoryRepo } = require("../repositories");
const { scoreDistance } = require('../utils/listing/score');


class CategoryServices {

//전체 카테 고리 조회
findAllCategories = async (page, [userX, userY]) =>{
  const result = await CategoryRepo.findAllCategories([userX, userY]);
  console.log(result[0].length)

  const list = 10;
  return result[0].map((store)=>{
    const { score, distance } = scoreDistance(store, [userX, userY]);
    return {
      ...store,
      score: score ?? 0, 
      distance: (distance/1000).toFixed(1) + 'km'
    }
  }).sort((a,b)=>{
    if (a.score < b.score) return 1
    if (a.score > b.score) return -1
    return 0
  }).slice(page*list, (page+1)*list)
}
//카테고리에 해당하는 매장 조회
findOneCategory = async (categoryId, page, [userX, userY]) =>{
  const result = await CategoryRepo.findOneCategory(categoryId, [userX, userY])
  const list = 10;

  return result[0].map((store)=>{
    const { score, distance } = scoreDistance(store, [userX, userY]);
    return {
      ...store,
      score, 
      distance: (distance/1000).toFixed(1) + 'km'
    }
  }).sort((a,b)=>{
    if (a.score < b.score) return 1
    if (a.score > b.score) return -1
    return 0
  }).slice(page*list, (page+1)*list)
}

}

module.exports = new CategoryServices();
