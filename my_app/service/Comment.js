const Comment = require('../models/CommentModel');
module.exports = {
    addComment: async (comment)=> {
        return await Comment.create(comment);
    },
    deleteComment: async (id)=> {
        return await Comment.findByIdAndDelete(id);
    },
    getAllComments: async ()=> {
        return await Comment.find();
    },
    getCommentById: async (id)=> {
        return await Comment.findById(id);
    },
    getCommentByVenueId: async (id)=> {
        return await Comment.find({Activity_id: id});
    },
    getAllRating: async (id)=> {
        return await Comment.find({Activity_id: id}).select('rating');
    },
    updateComment: async(id,comment)=> {
        return await Comment.findByIdAndUpdate(id,comment,{new:true});
    }
}