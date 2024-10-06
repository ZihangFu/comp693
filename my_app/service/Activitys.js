const Activitys = require("../models/ActivityModel");
module.exports = {
    addActivity: async (activity)=> {
        return await Activitys.create(activity);
    },
    deleteActivity: async (id)=> {
        return await Activitys.findByIdAndDelete(id);
    },
    getAllActivity: async ()=> {
        return await Activitys.find();
    },
    getActivityById: async (id)=> {
        return await Activitys.findById(id);
    },
    updateActivity: async(id,activity)=> {
        return await Activitys.findByIdAndUpdate(id,activity);
    }
}