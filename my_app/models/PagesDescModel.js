const mongo = require("./init");
const Model = mongo.Schema({
    Pages_id:mongo.Schema.Types.ObjectId,
    desc:{
        type:Array
    }
})
module.exports = mongo.model('pagedescs', Model);