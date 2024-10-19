const Activitys = require("../models/ActivityModel");

module.exports = {
    // Function to search activities based on search parameters
    searchActivities: async (body) => {
        return await Activitys.find({
            $text: { $search: body.params }
        }).lean();
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