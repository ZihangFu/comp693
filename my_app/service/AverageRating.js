const AverageRating = require("../models/AverageRating");
module.exports = {
    updateAverageRating: async (id, averageRating) => {
        return await AverageRating.findOneAndUpdate(
            { Activity_id: id }, // Query conditions
            averageRating, // Update data
            { upsert: true, new: true } // If no match is found, insert and return a new document
        );
    },
    getAverageRatingById: async (id) => {
        return await AverageRating.findOne({Activity_id: id});
    },
    getAllAverageRating: async () => {
        return await AverageRating.find();
    },
}
