const express = require('express')
const router = express.Router()

const {getNews} = require('../controllers/getNews');
router.get('/', getNews);

module.exports = router