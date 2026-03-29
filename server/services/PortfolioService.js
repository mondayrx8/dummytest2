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
    async getAll() {
        return Portfolio.find();
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
        const { studentName, teamMembers, businessName, description, marketSize, image } = data;

        const newPortfolio = new Portfolio({
            studentName,
            teamMembers,
            businessName,
            description,
            marketSize,
            image,
        });

        return newPortfolio.save();
    }

    /**
     * Update an existing portfolio entry by ID.
     *
     * @param {string} id   - Mongoose ObjectId of the portfolio to update
     * @param {Object} data - Fields to update (partial or full)
     * @returns {Promise<Object|null>} The updated document, or null if not found
     */
    async update(id, data) {
        return Portfolio.findByIdAndUpdate(id, data, { new: true });
    }

    /**
     * Delete a portfolio entry by ID.
     *
     * @param {string} id - Mongoose ObjectId of the portfolio to delete
     * @returns {Promise<Object|null>} The deleted document, or null if not found
     */
    async delete(id) {
        return Portfolio.findByIdAndDelete(id);
    }
}

module.exports = PortfolioService;
