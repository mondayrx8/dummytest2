/**
 * PortfolioController - Express request handler for portfolio endpoints.
 *
 * Architecture:
 *   - Receives a PortfolioService instance via constructor injection (DI).
 *   - Does NOT contain try/catch blocks; all errors propagate to the
 *     global errorHandler middleware automatically (Express 5).
 *   - Data validation for POST/PUT is handled by Zod middleware
 *     BEFORE requests reach these methods.
 *
 * Each method maps to a specific HTTP verb/route and translates
 * between the HTTP layer and the service layer.
 */

class PortfolioController {
    /**
     * @param {import('../services/PortfolioService')} portfolioService - Injected service instance
     */
    constructor(portfolioService) {
        this.portfolioService = portfolioService;

        // Bind methods so they retain `this` when used as route callbacks
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * GET /all
     * Retrieves every portfolio entry (public route).
     */
    async getAll(req, res) {
        const portfolios = await this.portfolioService.getAll();
        res.status(200).json(portfolios);
    }

    /**
     * POST /add
     * Creates a new portfolio entry (protected route).
     * Body has already been validated by Zod middleware.
     */
    async create(req, res) {
        const savedPortfolio = await this.portfolioService.create(req.body);
        res.status(201).json(savedPortfolio);
    }

    /**
     * PUT /update/:id
     * Updates an existing portfolio entry (protected route).
     * Body has already been validated by Zod middleware.
     */
    async update(req, res) {
        const updatedPortfolio = await this.portfolioService.update(
            req.params.id,
            req.body
        );
        res.status(200).json(updatedPortfolio);
    }

    /**
     * DELETE /delete/:id
     * Removes a portfolio entry (protected route).
     */
    async delete(req, res) {
        await this.portfolioService.delete(req.params.id);
        res.status(200).json({ message: 'Deleted successfully' });
    }
}

module.exports = PortfolioController;
