const express = require('express');
const router = express.Router();
const asyncHeadle = require("./baseController");
const Users = require("../service/Users");
router.get("/",asyncHeadle(async (req,res,next) =>{
    return await Users.getAllUsers();
}))
router.get("/:id",asyncHeadle(async (req,res,next) =>{
    return await Users.getUserById(req.params.id);
}))
router.post("/",asyncHeadle(async (req,res,next) =>{
    return await Users.addUser(req.body);
}))
router.put("/:id",asyncHeadle(async (req,res,next) =>{
    return await Users.updateUser(req.params.id,req.body);
}))
router.delete("/:id",asyncHeadle(async (req,res,next) =>{
    return await Users.deleteUser(req.params.id);
}))
module.exports = router;