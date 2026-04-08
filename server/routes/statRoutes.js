const express = require('express');
const router = express.Router();
const statController = require('../controllers/StatController');

// GET /api/stats
router.get('/', statController.getGlobalStats);

module.exports = router;
