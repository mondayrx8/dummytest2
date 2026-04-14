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
            const error = new Error('Tiada akaun ditemui dengan e-mel tersebut.');
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
        const resetLink = `http://localhost:5173/reset-password/${resetToken}?email=${email}`;
        // 🚨 NOTA: Tukar 'http://localhost:5173' kepada 'https://siswaniaga.my' bila deploy nanti!

        // Hantar E-mel menggunakan Resend
        try {
            await resend.emails.send({
                from: 'SiswaNiaga Admin <onboarding@resend.dev>', // Guna emel percuma Resend buat masa ni
                to: email,
                subject: 'SiswaNiaga - Reset Password Anda',
                html: `
                    <h2>Permohonan Reset Kata Laluan</h2>
                    <p>Hai ${user.username},</p>
                    <p>Seseorang telah memohon untuk menukar kata laluan akaun anda.</p>
                    <p>Klik butang di bawah untuk menetapkan kata laluan baharu:</p>
                    <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Kata Laluan</a>
                    <p>Jika anda tidak membuat permohonan ini, sila abaikan e-mel ini.</p>
                    <p>Pautan ini akan luput dalam masa 1 jam.</p>
                `
            });
            return { message: 'E-mel reset kata laluan telah dihantar!' };
        } catch (error) {
            console.error("Gagal hantar e-mel:", error);
            const err = new Error('Sistem e-mel sedang sibuk. Sila cuba sebentar lagi.');
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
            const error = new Error('Token tidak sah atau telah luput. Sila mohon semula.');
            error.statusCode = 400;
            throw error;
        }

        // Bandingkan token yang dihantar dengan yang disimpan
        const isValidToken = await bcrypt.compare(token, user.resetPasswordToken);
        if (!isValidToken) {
            const error = new Error('Token tidak sah.');
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

        return { message: 'Kata laluan berjaya ditukar. Sila log masuk.' };
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
