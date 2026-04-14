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
        this.getProfile = this.getProfile.bind(this);
        this.changePassword = this.changePassword.bind(this);
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
        // Tangkap email dari frontend
        const { username, email, password } = req.body;
        const result = await this.authService.register(username, email, password);
        res.status(201).json(result);
    }

    /**
     * POST /login
     * Authenticates a user and returns a JWT token.
     *
     * NOTE: No try/catch needed — same reasoning as above.
     */
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const result = await this.authService.login(username, password);
            res.json(result);
        } catch (error) {
            // Ini akan hantar ralat ke errorHandler.js kau
            next(error);
        }
    }

    /**
     * GET /profile
     * Get current user profile
     */
    async getProfile(req, res, next) {
        try {
            const profile = await this.authService.getProfile(req.user.id);
            res.json(profile);
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /change-password
     * Change user password
     */
    async changePassword(req, res, next) {
        try {
            const { oldPassword, newPassword } = req.body;
            const result = await this.authService.changePassword(req.user.id, oldPassword, newPassword);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;
