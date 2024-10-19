const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const asyncHeadle = require("./baseController");
const pageService = require("../service/Page");
const Page = require("../models/PageModel");
const URL = `http://13.238.254.19:8848`; 

// Route: GET all pages
router.get('/', asyncHeadle(async (req, res, next) => {
  // Fetch pages based on query parameters using pageService
  return await pageService.getPage(req.query);
}));

// Route: GET a specific page by ID
router.get('/:id', asyncHeadle(async (req, res, next) => {
  // Fetch a page by its ID using pageService
  return await pageService.getPageById(req.params.id);
}));

// Route: POST (Create) a new page
router.post('/', asyncHeadle(async (req, res, next) => {
  if (req.file) {
    const imgUrl = `/uploads/${req.file.filename}`;
    req.body.img_url = URL + imgUrl;
  }
  return await pageService.addPage(req.body);
}));

router.put('/:id', asyncHeadle(async (req, res, next) => {
  if (req.file) {
    const imgUrl = `/uploads/${req.file.filename}`;
    req.body.img_url = URL + imgUrl;
  }
  return await pageService.updatePage(req.params.id, req.body);
}));

router.delete('/:id', asyncHeadle(async (req, res, next) => {
  const page = await Page.findById(req.params.id);
    if (!page) {
        return res.status(404).json({ error: 'Page not found' });
    }
    if (page.img_url) {
        const imgPath = path.join(__dirname, "..", page.img_url);
        fs.unlink(imgPath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${imgPath}`, err);
            } else {
                console.log(`File deleted: ${imgPath}`);
            }
        });
    }
    return await pageService.deletePage(req.params.id);
}));

module.exports = router;