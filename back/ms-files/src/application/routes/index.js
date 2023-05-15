const express = require('express')
const FilesRoutes = require('./files.route')

// eslint-disable-next-line
const router = express.Router();

router.use('/files', FilesRoutes)

module.exports = router
