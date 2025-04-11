const express = require('express')
const router = express.Router()

const { getSummaryByUrl } = require('../controllers/getSummary');
router.get('/', getSummaryByUrl);

module.exports = router;

