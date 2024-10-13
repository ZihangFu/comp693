const mongo = require("./init");
const Model = mongo.Schema({
    user: String,
    content: String,
    timestamp: String,
    rating: Number,
    Activity_id:mongo.Schema.Types.ObjectId
})
module.exports = mongo.model('comments', Model);