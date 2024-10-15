const Users = require("../models/UsersModel");

module.exports = {
    getAllUsers: async () => {
        return await Users.find({})
    },
    getUserById: async (id) => {
        return await Users.findById(id);
    },
    selectByUsername: async (user) => {
        const name = new RegExp(user.username, 'i');
        return await Users.find({ username: name }).lean();
    },
    loginByUsernameAndPwd: async (user) => {
        const name = new RegExp(user.username, 'i');
        return await Users.find({ username: name, password: user.password }).lean();
    },
    addUser: async (user) => {
        return await Users.create(user)
    },
    updateUser: async (id, user) => {
        return await Users.updateOne({ _id: id }, user)
    },
    deleteUser: async (id) => {
        return await Users.deleteOne({ _id: id })
    }
};