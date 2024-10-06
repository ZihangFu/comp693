const express = require('express');
const router = express.Router();
const asyncHeadle = require("./baseController");
const CommentService = require("../service/Comment");

router.get('/', asyncHeadle(async (req, res) => {
  return await CommentService.getAllComments();
}));
router.post('/', asyncHeadle(async (req, res) => {
  return await CommentService.addComment(req.body);
}));
router.delete('/:id', asyncHeadle(async (req, res) => {
  return await CommentService.deleteComment(req.params.id);
}));
router.put('/:id', asyncHeadle(async (req, res) => {
  return await CommentService.updateComment(req.params.id,req.body);
}));
router.get('/:id', asyncHeadle(async (req, res) => {
  return await CommentService.getCommentById(req.params.id);
}));

module.exports = router;