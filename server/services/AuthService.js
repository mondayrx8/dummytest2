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
const crypto = require('crypto');
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

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
    async register(username, email, password) {
        // Check for duplicate username OR email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            const error = new Error('Username or Email already exists');
            error.statusCode = 400;
            throw error;
        }

        // Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);

        const newUser = new User({ username, email, password: hashedPassword });
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

    // 👇👇👇 1. Fungsi Hantar E-mel Lupa Kata Laluan 👇👇👇
    async forgotPassword(email) {
        // Cari pengguna berdasarkan e-mel
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Cipta token rawak (Token Sakti)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = await bcrypt.hash(resetToken, this.saltRounds);

        // Simpan token dalam database dengan tempoh sah (contoh: 1 jam)
        user.resetPasswordToken = tokenHash;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 Jam
        await user.save();

        // Bina Link Reset (Arahkan ke Frontend)
        // Ambil URL depan dari .env (atau guna localhost kalau takde)
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        const resetLink = `${clientUrl}/reset-password/${resetToken}?email=${email}`;

        // Hantar E-mel menggunakan Resend
        try {
            await resend.emails.send({
                from: 'SiswaNiaga Admin <admin@siswaniaga.my>',
                to: email,
                subject: 'SiswaNiaga - Reset Password',
                html: `
                    <h2>SiswaNiaga - Reset Password</h2>
                    <p>Hi ${user.username},</p>
                    <p>Someone requested to reset the password for your account.</p>
                    <p>Click the button below to set a new password:</p>
                    <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>This link will expire in 1 hour.</p>
                `
            });
            return { message: 'The reset email has been sent. Please check your inbox.' };
        } catch (error) {
            console.error("Failed to send email:", error);
            const err = new Error('The email system is busy. Please try again later.');
            err.statusCode = 500;
            throw err;
        }
    }

    // 👇👇👇 2. Fungsi Tetapkan Kata Laluan Baharu 👇👇👇
    async resetPassword(email, token, newPassword) {
        const user = await User.findOne({
            email,
            resetPasswordExpires: { $gt: Date.now() } // Pastikan token belum luput
        });

        if (!user || !user.resetPasswordToken) {
            const error = new Error('Invalid or expired token. Please request again.');
            error.statusCode = 400;
            throw error;
        }

        // Bandingkan token yang dihantar dengan yang disimpan
        const isValidToken = await bcrypt.compare(token, user.resetPasswordToken);
        if (!isValidToken) {
            const error = new Error('Invalid token.');
            error.statusCode = 400;
            throw error;
        }

        // Hash password baharu
        const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);

        // Kemaskini password dan buang token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return { message: 'Password reset successfully. Please log in.' };
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
        return {
            username: user.username,
            email: user.email || 'No Email', // ✅ Tambah ini
            role: user.role
        };
    }

    /**
     * Change user password.
     * @param {string} userId
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns {Promise<{message: string}>}
     */

    async updateEmail(userId, newEmail) {
        // Semak kalau e-mel tu dah wujud dan dimiliki orang lain
        const existingEmail = await User.findOne({ email: newEmail });
        if (existingEmail && existingEmail._id.toString() !== userId.toString()) {
            const error = new Error('Email already registered by another user.');
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findById(userId);
        user.email = newEmail;
        await user.save();
        return { message: 'Email has been updated successfully!' };
    }

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

        return { message: 'Password has been changed successfully!' };
    }
}

module.exports = AuthService;
