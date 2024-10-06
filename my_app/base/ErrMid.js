const {ResFail} = require("./ResApi");
module.exports = (err,req,res,next) =>{
    if(err){
        res.json(ResFail(err))
    }else{
        next()
    }
}