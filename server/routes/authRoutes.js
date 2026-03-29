/**
 * Auth Routes - Maps HTTP endpoints to AuthController methods.
 *
 * This file is intentionally thin: it only wires up Express routes
 * to controller class methods. All business logic lives in
 * AuthService, and all HTTP handling lives in AuthController.
 */

const express = require('express');
const router = express.Router();

// Import Service and Controller classes
const AuthService = require('../services/AuthService');
const AuthController = require('../controllers/AuthController');

// Instantiate the service, then inject it into the controller
const authService = new AuthService();
const authController = new AuthController(authService);

// POST /api/auth/register  -  Create a new user account
router.post('/register', authController.register);

// POST /api/auth/login     -  Authenticate and receive a JWT
router.post('/login', authController.login);

module.exports = router;