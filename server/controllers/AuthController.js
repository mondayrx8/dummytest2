/**
 * AuthController - Express request handler for authentication endpoints.
 *
 * Architecture:
 *   - Receives an AuthService instance via constructor injection (DI).
 *   - Does NOT contain try/catch blocks; errors are propagated to
 *     the global errorHandler middleware automatically.
 *   - Data validation is handled BEFORE this controller is reached,
 *     via Zod validation middleware in the route definitions.
 *
 * This controller is intentionally thin: it translates HTTP semantics
 * (status codes, req/res) and delegates ALL business logic to the
 * service layer.
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
     *
     * NOTE: No try/catch needed.
     * - Express 5 natively catches rejected promises from async handlers
     *   and forwards the error to the global error-handling middleware.
     * - Request body has already been validated by Zod middleware.
     */
    async register(req, res) {
        const { username, password } = req.body;
        const result = await this.authService.register(username, password);
        res.status(201).json(result);
    }

    /**
     * POST /login
     * Authenticates a user and returns a JWT token.
     *
     * NOTE: No try/catch needed — same reasoning as above.
     */
    async login(req, res) {
        const { username, password } = req.body;
        const result = await this.authService.login(username, password);
        res.json(result);
    }
}

module.exports = AuthController;
