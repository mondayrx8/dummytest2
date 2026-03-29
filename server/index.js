/**
 * Server Entry Point (index.js)
 *
 * Responsibilities:
 *   1. Load environment variables
 *   2. Configure Express middleware (CORS, body parsing)
 *   3. Mount route modules (auth, portfolio)
 *   4. Connect to MongoDB via Mongoose
 *   5. Start the HTTP server
 *
 * Architecture Overview:
 *   Routes  →  Controllers (HTTP layer)  →  Services (business logic)  →  Models (DB)
 *
 * This file does NOT contain any business logic; it is purely
 * responsible for application bootstrapping and configuration.
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// ──────────────────────────────────────────────
// Middleware Configuration
// ──────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// ──────────────────────────────────────────────
// Route Mounting
// ──────────────────────────────────────────────
const portfolioRoutes = require('./routes/portfolioRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/auth', authRoutes);

// ──────────────────────────────────────────────
// Database Connection
// ──────────────────────────────────────────────
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully!'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// ──────────────────────────────────────────────
// Start Server
// ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (OOP Architecture Active)`);
});