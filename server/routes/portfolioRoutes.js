/**
 * Portfolio Routes - Maps HTTP endpoints to PortfolioController methods.
 *
 * This file is intentionally thin: it only wires up Express routes
 * (including auth middleware for protected endpoints) to controller
 * class methods. All business logic lives in PortfolioService, and
 * all HTTP handling lives in PortfolioController.
 */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Import Service and Controller classes
const PortfolioService = require('../services/PortfolioService');
const PortfolioController = require('../controllers/PortfolioController');

// Instantiate the service, then inject it into the controller
const portfolioService = new PortfolioService();
const portfolioController = new PortfolioController(portfolioService);

// GET  /api/portfolio/all          -  Retrieve all portfolios (public)
router.get('/all', portfolioController.getAll);

// POST /api/portfolio/add          -  Create a new portfolio (protected)
router.post('/add', auth, portfolioController.create);

// PUT  /api/portfolio/update/:id   -  Update a portfolio   (protected)
router.put('/update/:id', auth, portfolioController.update);

// DELETE /api/portfolio/delete/:id -  Remove a portfolio   (protected)
router.delete('/delete/:id', auth, portfolioController.delete);

module.exports = router;