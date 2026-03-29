/**
 * AuthController - Express request handler for authentication endpoints.
 *
 * This controller receives an AuthService instance via constructor
 * injection, keeping it decoupled from the concrete service
 * implementation. Each method handles HTTP request/response
 * concerns and delegates business logic to the service layer.
 */

class AuthController {
    /**
     * @param {import('../services/AuthService')} authService - Injected service instance
     */
    constructor(authService) {
        this.authService = authService;

        // Bind methods so they can be passed as Express route callbacks
        // without losing the `this` context.
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    /**
     * POST /register
     * Registers a new user account.
     */
    async register(req, res) {
        try {
            const { username, password } = req.body;
            const result = await this.authService.register(username, password);
            res.status(201).json(result);
        } catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ message: error.message || 'Registration failed' });
        }
    }

    /**
     * POST /login
     * Authenticates a user and returns a JWT token.
     */
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await this.authService.login(username, password);
            res.json(result);
        } catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ message: error.message || 'Login failed' });
        }
    }
}

module.exports = AuthController;
