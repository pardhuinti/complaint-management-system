const express = require('express');
const router = express.Router();
const { getReportSummary } = require('../controllers/reportController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/summary', protect, adminOnly, getReportSummary);

module.exports = router;
