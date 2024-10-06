const express = require('express');
const router = express.Router();
const asyncHeadle = require("./baseController");
const PageDesc = require("../service/PagesDesc");

router.get('/', asyncHeadle(async (req, res) => {
  return await PageDesc.getPage();
}));
router.get('/:id', asyncHeadle(async (req, res) => {
  return await PageDesc.getPageById(req.params.id);
}));
router.post('/', asyncHeadle(async (req, res) => {
  return await PageDesc.addPage(req.body);
}));
router.put('/:id', asyncHeadle(async (req, res) => {
  return await PageDesc.updatePage(req.params.id,req.body);
}));
router.delete('/:id', asyncHeadle(async (req, res) => {
  return await PageDesc.deletePage(req.params.id);
}));
router.get('/pageId/:pageId', asyncHeadle(async (req, res) => {
  return await PageDesc.getPageByPageId(req.params.pageId);
}));
module.exports = router;