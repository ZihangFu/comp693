const mongo = require("./init");
const Model = mongo.Schema({
    title:String,
    hots:Number,
    Activity_id:mongo.Schema.Types.ObjectId
})
module.exports = mongo.model('comments', Model);