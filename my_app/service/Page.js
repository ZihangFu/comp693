const Page = require('../models/PageModel')
module.exports = {
    getPage: async ()=>{
        return await Page.find({})
    }
    ,
    getDict: async ()=>{
        return await Page.find({}).select('id title');
    }
    ,
    updatePage: async (id,page)=>{
       return await Page.updateOne({_id:id},page)
    }
    ,
    getPageById: async (id)=>{
        return await Page.findById(id)
    }
    ,
    addPage: async (page)=>{
        return await Page.create(page)
    }
    ,
    deletePage: async (id)=>{
        return await Page.deleteOne({_id:id})
    }
}