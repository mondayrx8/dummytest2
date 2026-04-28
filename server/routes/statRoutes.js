const express = require('express');
const router = express.Router();
const statController = require('../controllers/StatController');

// GET /api/stats
router.get('/', statController.getGlobalStats);

// GET /api/stats/analytics (Khas untuk dashboard admin)
router.get('/analytics', statController.getAdminAnalytics);

module.exports = router;
