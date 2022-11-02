const { CategoryService } = require("../services");


class CategoryController {

  //전체 카테 고리 조회
  findAllCategories = async (req,res,next) =>{
    console.log("ALLLLLLLLLLLLLLL")
    try{
      const { X, Y } = req.app.locals.user;
      const { page } = req.query;
      const storeList = await CategoryService.findAllCategories(Number(page), [X, Y]);

      res.status(200).json({ storeList });
    }catch(error){
      console.log(error);
      res.status(400).json({msg : "카테고리 목록 조회 에러"});
    }
  }

  //카테고리에 해당하는 매장 조회
  findOneCategory = async (req, res, next) =>{
    try{
      const { categoryId } = req.params;
      if (Number.isNaN(Number(categoryId))) return next();
      
      const { X, Y } = req.app.locals.user;
      const { page } = req.query;
      const storeList = await CategoryService.findOneCategory(categoryId, Number(page), [X, Y]);
      
      res.status(200).json({ storeList });
    }catch(error){
      console.log(error);
      res.status(400).json({msg : "카테고리별 매장 목록 조회 에러"});
    }
  }

}

module.exports = new CategoryController();
