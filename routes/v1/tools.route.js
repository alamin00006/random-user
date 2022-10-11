const express = require('express');
const router = express.Router();
const toolsControler = require('../../controlsers/tools.controler');

router.route('/')
      .get(toolsControler.getAllTools)
      .post(toolsControler.saveATool)

router.route('/:random').get(toolsControler.detailsTool)
.patch(toolsControler.updateData)
.delete(toolsControler.deleteTool)
module.exports = router;