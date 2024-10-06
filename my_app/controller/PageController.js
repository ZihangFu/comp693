const express = require('express');
const router = express.Router();
const asyncHeadle = require("./baseController");
const pageService = require("../service/Page");

router.get('/', asyncHeadle(async (req, res,next) => {
  return await pageService.getPage(req.query);

}));
router.get('/:id', asyncHeadle(async (req, res,next) => {
  return await pageService.getPageById(req.params.id);
}));
router.post('/', asyncHeadle(async (req, res,next) => {
  return await pageService.addPage(req.body);
}));
router.put('/:id', asyncHeadle(async (req, res,next) => {
  return await pageService.updatePage(req.params.id, req.body);
}));
router.delete('/:id', asyncHeadle(async (req, res,next) => {
  return await pageService.deletePage(req.params.id);
}));

module.exports = router;