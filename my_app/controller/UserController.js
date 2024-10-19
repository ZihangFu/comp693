const express = require('express');
const router = express.Router();
const asyncHeadle = require("./baseController");
const Users = require("../service/Users");

// Route: GET all users
router.get("/", asyncHeadle(async (req, res, next) => {
    return await Users.getAllUsers();
}))
// Route: GET all users
router.get("/:id", asyncHeadle(async (req, res, next) => {
    return await Users.getUserById(req.params.id);
}))
// Route: POST (Create) a new user
router.post("/", async (req, res, next) => {
    try {
        const user = req.body;
        const userExists = await Users.selectByUsername(user);
        if (userExists.length === 0) {
            await Users.addUser(user);
            return res.status(200).json({ code: 200, message: 'success' });
        } else {
            return res.status(200).json({ code: 200, message: 'registered' });
        }
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
})
router.put("/:id", async (req, res, next) => {
    try {
        const user = req.body;
        await Users.updateUser(req.params.id, user);
        return res.status(200).json({ code: 200, message: 'success' });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
})
router.delete("/:id", asyncHeadle(async (req, res, next) => {
    return await Users.deleteUser(req.params.id);
}))
module.exports = router;