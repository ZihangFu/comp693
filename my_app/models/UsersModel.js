const mongo = require("./init");
const UserModel = mongo.Schema({
    name:String,
    username:String,
    password:String,
    email:String
})
module.exports = mongo.model('users', UserModel);