const ResSuccess =(data) =>{
     
    return{
            code:200,
            data
        }

}
const ResFail =(err) =>{
    return{
            code:500,
            err:err.message
        }
}
module.exports = {ResSuccess,ResFail}

