/**
 * PortfolioController - Express request handler for portfolio endpoints.
 *
 * This controller receives a PortfolioService instance via constructor
 * injection. Each method maps to a specific HTTP verb/route and
 * translates between the HTTP layer and the service layer.
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
        try {
            const portfolios = await this.portfolioService.getAll();
            res.status(200).json(portfolios);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    }

    /**
     * POST /add
     * Creates a new portfolio entry (protected route).
     */
    async create(req, res) {
        try {
            const savedPortfolio = await this.portfolioService.create(req.body);
            res.status(201).json(savedPortfolio);
        } catch (error) {
            console.error('Error Saving Portfolio:', error.message);
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * PUT /update/:id
     * Updates an existing portfolio entry (protected route).
     */
    async update(req, res) {
        try {
            const updatedPortfolio = await this.portfolioService.update(req.params.id, req.body);
            res.status(200).json(updatedPortfolio);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update' });
        }
    }

    /**
     * DELETE /delete/:id
     * Removes a portfolio entry (protected route).
     */
    async delete(req, res) {
        try {
            await this.portfolioService.delete(req.params.id);
            res.status(200).json({ message: 'Deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete' });
        }
    }
}

module.exports = PortfolioController;
