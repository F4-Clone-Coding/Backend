const StoreServices = require("../services/store");

  class StoreController {

    storeservices = new StoreServices();
    
    //매장 상세페이지 조회
    DetailStore = async(req,res,next)=>{
     try{ 
      const {storeId} = req.params
      const findStore = await this.storeservices.DetailStore(storeId)
      res.status(200).send({data : findStore})
     }catch(error){
      console.log(error)
      res.status(400).send({msg : "매장 상세 보기 에러"})
     }
    }
  
  }

module.exports = StoreController;