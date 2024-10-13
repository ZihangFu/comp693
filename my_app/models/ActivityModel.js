const mongo = require("./init");
const Model = mongo.Schema({
    title: { type: String, index: true },
    img_url: String,
    desc: { type: String, index: true },
    Pages_id: mongo.Schema.Types.ObjectId
})

// Model.createIndex({ title: 'text', desc: 'text' });

module.exports = mongo.model('activitys', Model);



