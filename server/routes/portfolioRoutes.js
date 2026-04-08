/**
 * Portfolio Routes - Maps HTTP endpoints to PortfolioController methods.
 *
 * This file is the composition root for portfolio operations:
 *   1. Instantiates the Service (business logic layer)
 *   2. Injects the Service into the Controller (DI)
 *   3. Applies Zod validation middleware to mutation routes (POST/PUT)
 *   4. Applies auth middleware to protected routes
 *   5. Wires Express routes to controller methods
 *
 * Request flow (protected + validated):
 *   Client  →  auth  →  validate(schema)  →  PortfolioController  →  PortfolioService  →  DB
 */

const express = require('express');
const router = express.Router();

// ── Middleware ───────────────────────────────────────
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

// ── Validation Schemas ──────────────────────────────
const {
    createPortfolioSchema,
    updatePortfolioSchema,
} = require('../validations/portfolioValidation');

// ── Service & Controller (Dependency Injection) ─────
const PortfolioService = require('../services/PortfolioService');
const PortfolioController = require('../controllers/PortfolioController');

const portfolioService = new PortfolioService();
const portfolioController = new PortfolioController(portfolioService);

// ── Route Definitions ───────────────────────────────

// GET  /api/portfolio/all  -  Retrieve all portfolios (public)
router.get('/all', portfolioController.getAll);

// GET  /api/portfolio/view/:id  -  Retrieve a single portfolio (public)
router.get('/view/:id', portfolioController.getPortfolioById);

// POST /api/portfolio/add  -  Create a new portfolio (protected + validated)
//   1. auth                        → verifies JWT token
//   2. validate(createPortfolioSchema) → checks required fields & constraints
//   3. portfolioController.create  → delegates to PortfolioService.create()
router.post('/add', auth, validate(createPortfolioSchema), portfolioController.create);

// PUT  /api/portfolio/update/:id  -  Update a portfolio (protected + validated)
//   1. auth                        → verifies JWT token
//   2. validate(updatePortfolioSchema) → checks partial fields & constraints
//   3. portfolioController.update  → delegates to PortfolioService.update()
router.put('/update/:id', auth, validate(updatePortfolioSchema), portfolioController.update);

// DELETE /api/portfolio/delete/:id  -  Remove a portfolio (protected)
router.delete('/delete/:id', auth, portfolioController.delete);

module.exports = router;