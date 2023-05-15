const express = require('express')
const FilesController = require('../controllers/files.controller')

// eslint-disable-next-line
const router = express.Router();

router
  .route('/data')
  .get(FilesController.getData)
router
  .route('/list')
  .get(FilesController.getFiles)

module.exports = router
