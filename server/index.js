/**
 * Server Entry Point (index.js)
 *
 * Responsibilities:
 *   1. Load environment variables
 *   2. Configure Express middleware (CORS, body parsing)
 *   3. Mount route modules (auth, portfolio)
 *   4. Mount global error handler (MUST be last middleware)
 *   5. Connect to MongoDB via Mongoose
 *   6. Start the HTTP server
 *
 * Architecture Overview:
 *   Routes  →  Validation (Zod)  →  Controllers (HTTP)  →  Services (logic)  →  Models (DB)
 *              ↘ on error ↙             ↘ on error ↙
 *                        Global Error Handler
 *
 * This file does NOT contain any business logic; it is purely
 * responsible for application bootstrapping and configuration.
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();

// Import the global error handler
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// ──────────────────────────────────────────────
// Middleware Configuration
// ──────────────────────────────────────────────
const allowedOrigins = [
    'http://localhost:5173',
    'https://siswaniaga.my',
    'https://www.siswaniaga.my',
    'https://dummytest2.vercel.app',
    'https://siswaniaga-frontend.pages.dev'
];

// Buang simbol '/' di hujung CLIENT_URL jika ada
if (process.env.CLIENT_URL) {
    allowedOrigins.push(process.env.CLIENT_URL.replace(/\/$/, ""));
}

app.use(cors({
    origin: function (origin, callback) {
        // Benarkan jika origin ada dalam senarai ATAU jika tiada origin (cth: Postman)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // Log ini yang muncul kat Render tadi!
            console.error('[CORS BLOCK] Akses disekat dari origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// ──────────────────────────────────────────────
// Route Mounting
// ──────────────────────────────────────────────
const portfolioRoutes = require('./routes/portfolioRoutes');
const authRoutes = require('./routes/authRoutes');
const statRoutes = require('./routes/statRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/ai', aiRoutes);

// ──────────────────────────────────────────────
// Global Error Handler (MUST be after all routes)
// ──────────────────────────────────────────────
// This catches ALL errors thrown in controllers, services,
// and validation middleware — providing a consistent JSON
// error response format across the entire API.
app.use(errorHandler);

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
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT} (Enterprise Architecture Active)`);
});