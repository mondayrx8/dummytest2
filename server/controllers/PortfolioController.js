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
        this.getPortfolioById = this.getPortfolioById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getDashboardList = this.getDashboardList.bind(this);
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
     * GET /dashboard-list
     */
    async getDashboardList(req, res) {
        const portfolios = await this.portfolioService.getDashboardPortfolios(req.user.id, req.user.role);
        res.status(200).json(portfolios);
    }

    /**
     * GET /view/:id
     * Retrieves a single portfolio entry by ID (public route).
     */
    async getPortfolioById(req, res) {
        try {
            const portfolio = await this.portfolioService.getById(req.params.id);
            res.status(200).json(portfolio);
        } catch (error) {
            // Because error handler will catch normal thrown errors, but if ID format is invalid, 
            // mongoose throws CastError, so we let it propagate or catch it.
            // Actually, we'll let it propagate.
            res.status(404).json({ message: error.message });
        }
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
