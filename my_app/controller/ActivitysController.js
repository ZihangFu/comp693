const express = require('express');
const router = express.Router();
const asyncHeadle = require("./baseController");
const ActivitysService = require("../service/Activitys");

router.get('/', asyncHeadle(async (req, res) => {
  return await ActivitysService.getAllActivity();
}));
router.get('/:id', asyncHeadle(async (req, res) => {
  return await ActivitysService.getActivityById(req.params.id);
}));
router.post('/', asyncHeadle(async (req, res) => {
  return await ActivitysService.addActivity(req.body);
}));
router.put('/:id', asyncHeadle(async (req, res) => {
  return await ActivitysService.updateActivity(req.params.id,req.body);
}));
router.delete('/:id', asyncHeadle(async (req, res) => {
  return await ActivitysService.deleteActivity(req.params.id);
}));

module.exports = router;