const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const asyncHeadle = require("./baseController");
const ActivitysService = require("../service/Activitys");
const Activitys = require("../models/ActivityModel");
const URL = `http://localhost:8848`; 

router.get('/', asyncHeadle(async (req, res) => {
  return await ActivitysService.getAllActivity();
}));

router.get('/:id', asyncHeadle(async (req, res) => {
  return await ActivitysService.getActivityById(req.params.id);
}));

router.post('/', asyncHeadle(async (req, res) => {
  if (req.file) {
    const imgUrl = `/uploads/${req.file.filename}`;
    req.body.img_url = URL + imgUrl;
  }
  return await ActivitysService.addActivity(req.body);
}));

router.put('/:id', asyncHeadle(async (req, res) => {
  if (req.file) {
    const imgUrl = `/uploads/${req.file.filename}`;
    req.body.img_url = URL + imgUrl;
  }
  return await ActivitysService.updateActivity(req.params.id, req.body);
}));

router.delete('/:id', asyncHeadle(async (req, res) => {
  const activity = await Activitys.findById(req.params.id);
    if (!activity) {
        return res.status(404).json({ error: 'activity not found' });
    }
    if (activity.img_url) {
        const imgPath = path.join(__dirname, "..", activity.img_url);
        fs.unlink(imgPath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${imgPath}`, err);
            } else {
                console.log(`File deleted: ${imgPath}`);
            }
        });
    }
  return await ActivitysService.deleteActivity(req.params.id);
}));

module.exports = router;