const Activitys = require("../models/ActivityModel");

module.exports = {
    searchActivities: async (body) => {
        const regex = new RegExp(body.params, 'i');
        return await Activitys.find({
            $or: [
                { title: regex },
                { desc: regex }
            ]
        }).limit(10).lean();
    },
    addActivity: async (activity) => {
        return await Activitys.create(activity);
    },
    deleteActivity: async (id) => {
        return await Activitys.findByIdAndDelete(id);
    },
    getAllActivity: async () => {
        return await Activitys.find();
    },
    getActivityById: async (id) => {
        return await Activitys.findById(id);
    },
    getActivityByPagesId: async (id) => {
        return await Activitys.find({ Pages_id: id });
    },
    updateActivity: async (id, activity) => {
        return await Activitys.findByIdAndUpdate(id, activity);
    }
}