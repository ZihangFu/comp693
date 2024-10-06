const {ResSuccess} = require("../base/ResApi");

module.exports = (headle) =>{
    return async (req,res,next) => {
        try{
            const result = await headle(req,res,next);
            res.json(ResSuccess(result))
        }catch(e){
            next(e);
        }
    }
}