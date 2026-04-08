/**
 * AuthService - Handles all authentication business logic.
 *
 * This service class encapsulates the core authentication operations
 * (registration, login) and interacts directly with the User model
 * and security libraries (bcrypt, jwt). Controllers delegate all
 * business logic here, keeping route handlers thin.
 */

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    /**
     * @param {Object} options
     * @param {string} options.jwtSecret  - Secret key used for signing JWT tokens
     * @param {string} options.jwtExpiry  - Token lifetime (e.g. "1h")
     * @param {number} options.saltRounds - bcrypt cost factor for hashing
     */
    constructor({ jwtSecret = 'MY_SUPER_SECRET_KEY', jwtExpiry = '1h', saltRounds = 10 } = {}) {
        this.jwtSecret = jwtSecret;
        this.jwtExpiry = jwtExpiry;
        this.saltRounds = saltRounds;
    }

    /**
     * Register a new user.
     *
     * @param {string} username
     * @param {string} password - Plain-text password (will be hashed)
     * @returns {Promise<{message: string}>}
     * @throws {Error} If the username already exists or save fails
     */
    async register(username, password) {
        // Check for duplicate username
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }

        // Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        return { message: 'User registered successfully!' };
    }

    /**
     * Authenticate a user and return a JWT token.
     *
     * @param {string} username
     * @param {string} password - Plain-text password to verify
     * @returns {Promise<{token: string, username: string}>}
     * @throws {Error} If user not found or password mismatch
     */
    async login(username, password) {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 400;
            throw error;
        }

        // Compare plain-text password against hashed value
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 400;
            throw error;
        }

        // Sign JWT with user ID dan ROLE
        const token = jwt.sign({ id: user._id, role: user.role }, this.jwtSecret, {
            expiresIn: this.jwtExpiry,
        });

        return { token, username: user.username, role: user.role };
    }

    /**
     * Get user profile by ID.
     * @param {string} userId
     * @returns {Promise<Object>}
     */
    async getProfile(userId) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        return { username: user.username, role: user.role };
    }

    /**
     * Change user password.
     * @param {string} userId
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns {Promise<{message: string}>}
     */
    async changePassword(userId, oldPassword, newPassword) {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            const error = new Error('Invalid old password');
            error.statusCode = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);
        user.password = hashedPassword;
        await user.save();

        return { message: 'Password updated successfully!' };
    }
}

module.exports = AuthService;
