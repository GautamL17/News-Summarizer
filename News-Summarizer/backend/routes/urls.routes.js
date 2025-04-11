const express = require('express')
const router = express.Router()

const {getUrls} = require('../controllers/getUrls')
router.get('/', getUrls)

module.exports = router;