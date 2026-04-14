/**
 * Auth Routes - Maps HTTP endpoints to AuthController methods.
 *
 * This file is the composition root for authentication:
 *   1. Instantiates the Service (business logic layer)
 *   2. Injects the Service into the Controller (DI)
 *   3. Applies Zod validation middleware to each route
 *   4. Wires Express routes to controller methods
 *
 * Request flow:
 *   Client  →  validate(schema)  →  AuthController  →  AuthService  →  DB
 */

const express = require('express');
const router = express.Router();

// ── Middleware ───────────────────────────────────────
const validate = require('../middleware/validate');
const auth = require('../middleware/authMiddleware');

// ── Validation Schemas ──────────────────────────────
const { registerSchema, loginSchema } = require('../validations/authValidation');

// ── Service & Controller (Dependency Injection) ─────
const AuthService = require('../services/AuthService');
const AuthController = require('../controllers/AuthController');

const authService = new AuthService();
const authController = new AuthController(authService);

// ── Route Definitions ───────────────────────────────

// POST /api/auth/register  -  Create a new user account
//   1. validate(registerSchema) → checks username, password, confirmPassword
//   2. authController.register  → delegates to AuthService.register()
router.post('/register', validate(registerSchema), authController.register);

// POST /api/auth/login     -  Authenticate and receive a JWT
//   1. validate(loginSchema)   → checks username & password are present
//   2. authController.login    → delegates to AuthService.login()
router.post('/login', validate(loginSchema), authController.login);

// GET /api/auth/profile     -  Get current user profile
router.get('/profile', auth, authController.getProfile);

// PUT /api/auth/change-password  -  Change user password
router.put('/change-password', auth, authController.changePassword);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;