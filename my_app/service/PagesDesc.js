const PagedESC = require('../models/PagesDescModel')
module.exports = {
    addPage: async (page)=>{
        return await PagedESC.create(page)
    },
    deletePage: async (id)=>{
        return await PagedESC.findByIdAndDelete(id)
    },
    getPage: async ()=>{
        return await PagedESC.find()
    },
    getPageById: async (id)=>{
        return await PagedESC.findById(id)
    }
    ,
    updatePage: async (id,page)=>{
        return await PagedESC.findByIdAndUpdate(id,page)
    },
    getPageByPageId: async (pageId)=>{
        return await PagedESC.find({Pages_id:pageId})
    }
}