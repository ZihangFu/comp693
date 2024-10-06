const mongo = require("./init");
const Model = mongo.Schema({
    title:String,
    desc:String,
    img_url:String,
})
module.exports = mongo.model('pages', Model);