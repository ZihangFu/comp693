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
        const salt_md5pwd = user.password +"zh";
        return await Users.find({ username: name, password: salt_md5pwd }).lean();
    },
    addUser: async (user) => {
        const salt_md5pwd = user.password +"zh";
        return await Users.create({ 
            name: user.name, 
            username: user.username, 
            password: salt_md5pwd, 
            email: user.email 
        })
    },
    updateUser: async (id, user) => {
        if (user.password) { 
            user.password = user.password + "zh"
        }
        return await Users.updateOne({ _id: id }, user)
    },
    deleteUser: async (id) => {
        return await Users.deleteOne({ _id: id })
    }
};