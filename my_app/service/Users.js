const Users = require("../models/UsersModel");

module.exports = {
    getAllUsers: async () => {
        return await Users.find({})
    },
    getUserById: async (id) => {
        return await Users.findById(id);
    },
    loginByUsernameAndPwd: async (user) => {
        return await Users.find({username: user.username, password: user.password});
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