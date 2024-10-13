const express = require('express');
const router = express.Router();
const asyncHeadle = require("./baseController");
const CommentService = require("../service/Comment");
const AverageRating = require("../service/AverageRating");

router.get('/', asyncHeadle(async (req, res) => {
  return await CommentService.getAllComments();
}));


router.post('/', asyncHeadle(async (req, res) => {
  const id = req.body.Activity_id;
  const result = await CommentService.addComment(req.body);
  const RatingList = await CommentService.getAllRating(id);
  // Calculate the average score
  let sum = 0;
  RatingList.forEach(comment => {
    sum += comment.rating;
  });

  // If there is rating data, calculate the average score, otherwise it is 0
  const avg = RatingList.length > 0 ? Math.round((sum / RatingList.length) * 2) / 2 : 0;

  await AverageRating.updateAverageRating(id, { avg_rating: avg });
  return result;
}));

router.delete('/:id', asyncHeadle(async (req, res) => {
  return await CommentService.deleteComment(req.params.id);
}));
router.put('/:id', asyncHeadle(async (req, res) => {
  return await CommentService.updateComment(req.params.id, req.body);
}));
router.get('/:id', asyncHeadle(async (req, res) => {
  return await CommentService.getCommentById(req.params.id);
}));

module.exports = router;