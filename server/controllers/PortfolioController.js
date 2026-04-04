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
     */
    async create(req, res) {
        // Kita selitkan userId ke dalam data dari frontend sebelum hantar ke database
        const portfolioData = { ...req.body, userId: req.user.id };
        const savedPortfolio = await this.portfolioService.create(portfolioData);
        res.status(201).json(savedPortfolio);
    }

    /**
     * PUT /update/:id
     */
    async update(req, res) {
        // Controller WAJIB suapkan ID dan Role pengguna yang tengah tekan butang
        const updatedPortfolio = await this.portfolioService.update(
            req.params.id,
            req.body,
            req.user.id,
            req.user.role
        );
        res.status(200).json(updatedPortfolio);
    }

    /**
     * DELETE /delete/:id
     */
    async delete(req, res) {
        // Controller WAJIB suapkan ID dan Role pengguna yang tengah tekan butang
        await this.portfolioService.delete(
            req.params.id,
            req.user.id,
            req.user.role
        );
        res.status(200).json({ message: 'Deleted successfully' });
    }
}

module.exports = PortfolioController;
