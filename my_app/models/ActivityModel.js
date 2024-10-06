const mongo = require("./init");
const Model = mongo.Schema({
    title:String,
    img_url:String,
    desc:String,
    Pages_id:mongo.Schema.Types.ObjectId
})
module.exports = mongo.model('activitys', Model);