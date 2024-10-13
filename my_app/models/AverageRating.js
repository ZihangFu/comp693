const mongo = require("./init");

const SchemaTypes = mongo.Schema.Types;
const Model = mongo.Schema({
    Activity_id: SchemaTypes.ObjectId,
    avg_rating: Number
})
module.exports = mongo.model('average_rating', Model);