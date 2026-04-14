/**
 * PortfolioService - Handles all portfolio-related business logic.
 *
 * This service class encapsulates CRUD operations for the Portfolio
 * model. It is consumed by PortfolioController, keeping database
 * interactions isolated from HTTP-layer concerns.
 */

const Portfolio = require('../models/Portfolio');

class PortfolioService {
    /**
     * Retrieve all portfolio entries.
     *
     * @returns {Promise<Array>} Array of portfolio documents
     */
    async getAll(page = 1, limit = 9, search = '') {
        const skip = (page - 1) * limit;
        let searchQuery = {};

        if (search) {
            searchQuery = {
                $or: [
                    { businessName: { $regex: search, $options: 'i' } },
                    { 'businessBasics.type': { $regex: search, $options: 'i' } },
                    { studentName: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const portfolios = await Portfolio.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Portfolio.countDocuments(searchQuery);

        return {
            success: true,
            count: portfolios.length,
            total: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: portfolios
        };
    }
    /**
     * Retrieve portfolios for dashboard based on user role
     */
    async getDashboardPortfolios(userId, userRole) {
        if (userRole === 'admin') {
            return Portfolio.find().sort({ createdAt: -1 }); // Admin nampak semua
        } else {
            return Portfolio.find({ userId: userId }).sort({ createdAt: -1 }); // User nampak dia punya je
        }
    }

    /**
     * Retrieve a single portfolio entry by ID.
     *
     * @param {string} id - The portfolio ID
     * @returns {Promise<Object>} The portfolio document
     */
    async getById(id) {
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) throw new Error("Portfolio not found");
        return portfolio;
    }

    /**
     * Create a new portfolio entry.
     *
     * @param {Object} data - Portfolio fields
     * @param {string} data.studentName
     * @param {string} [data.teamMembers]
     * @param {string} data.businessName
     * @param {string} data.description
     * @param {string} data.marketSize
     * @param {string} [data.image] - Base64-encoded image string
     * @returns {Promise<Object>} The saved portfolio document
     * @throws {Error} If validation or save fails
     */
    async create(data) {
        // ✅ Guna 'data' bulat-bulat, telan semua sekali (termasuk optional fields & userId)
        const newPortfolio = new Portfolio(data);

        return newPortfolio.save();
    }

    /**
     * Update an existing portfolio entry by ID.
     */
    async update(id, data, userId, userRole) {
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) throw new Error("Portfolio not found");

        // Privacy: If not admin and not owner, kick him!
        if (userRole !== 'admin' && portfolio.userId.toString() !== userId.toString()) {
            const error = new Error("Access Denied: You cannot edit someone else's portfolio.");
            error.statusCode = 403;
            throw error;
        }

        return Portfolio.findByIdAndUpdate(id, data, { new: true });
    }

    /**
     * Delete a portfolio entry by ID.
     */
    async delete(id, userId, userRole) {
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) throw new Error("Portfolio not found");

        // Privacy: If not admin and not owner, kick him!
        if (userRole !== 'admin' && portfolio.userId.toString() !== userId.toString()) {
            const error = new Error("Access Denied: You cannot delete someone else's portfolio.");
            error.statusCode = 403;
            throw error;
        }

        return Portfolio.findByIdAndDelete(id);
    }
}

module.exports = PortfolioService;
