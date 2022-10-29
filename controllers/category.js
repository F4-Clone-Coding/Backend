const CategoryServices = require("../services/category.js");

  class CategoryController {

    categoryservices = new CategoryServices();
  //전체 카테 고리 조회
  findAllCategories = async (req,res,next) =>{
    try{
      const findAllCategory = await this.categoryservices.findAllCategories()
      res.status(200).send({data : findAllCategory})
    }catch(error){
      console.log(error)
      res.status(400).send({msg : "카테고리 목록 조회 에러"})
    }
  }
  
  //카테고리에 해당하는 매장 조회
  findOneCategory = async (req,res,next) =>{
    try{
      const {categoryId} = req.params
      const findAllCategory = await this.categoryservices.findOneCategory(categoryId)
      res.status(200).send({data : findAllCategory})
    }catch(error){
      console.log(error)
      res.status(400).send({msg : "카테고리별 매장 목록 조회 에러"})
    }
  }

  }

module.exports = CategoryController;