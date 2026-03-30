/**
 * Global Error Handler Middleware
 *
 * This middleware sits at the BOTTOM of the Express middleware stack
 * and catches all errors that are thrown or passed via `next(error)`
 * from controllers or other middleware.
 *
 * Architecture:
 *   Controller throws  →  Express catches  →  This handler responds
 *
 * Benefits:
 *   - Eliminates repetitive try/catch blocks in every controller method
 *   - Provides consistent error response format across the entire API
 *   - Centralises logging so errors are tracked in one place
 *   - Handles different error types (validation, auth, DB, unknown)
 *
 * NOTE: Express 5 automatically forwards errors thrown inside async
 * route handlers to the error-handling middleware, so we do NOT need
 * the `express-async-handler` wrapper package.
 */

const { ZodError } = require('zod');

/**
 * Custom application error class.
 * Allows services/controllers to throw errors with an HTTP status code.
 *
 * @example
 *   throw new AppError('User not found', 404);
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Flag to distinguish from programming errors
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Express error-handling middleware (signature MUST have 4 parameters).
 *
 * @param {Error}  err  - The error object thrown or passed via next()
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
    // ── 1. Log the error for server-side debugging ──────────────
    console.error(`[ERROR] ${req.method} ${req.originalUrl} →`, err.message);

    // ── 2. Zod Validation Errors ────────────────────────────────
    // These are thrown by the validate() middleware when req.body
    // does not match the Zod schema.
    if (err instanceof ZodError) {
        const formattedErrors = err.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
        }));

        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: formattedErrors,
        });
    }

    // ── 3. Mongoose Validation Errors ───────────────────────────
    if (err.name === 'ValidationError') {
        const formattedErrors = Object.values(err.errors).map((e) => ({
            field: e.path,
            message: e.message,
        }));

        return res.status(400).json({
            success: false,
            message: 'Database validation failed',
            errors: formattedErrors,
        });
    }

    // ── 4. Mongoose CastError (e.g. invalid ObjectId) ───────────
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: `Invalid ${err.path}: ${err.value}`,
        });
    }

    // ── 5. Mongoose Duplicate Key Error ─────────────────────────
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue).join(', ');
        return res.status(409).json({
            success: false,
            message: `Duplicate value for field(s): ${field}`,
        });
    }

    // ── 6. Operational / Known Application Errors ───────────────
    // These are errors we throw deliberately (e.g. "User not found")
    const statusCode = err.statusCode || 500;
    const message =
        err.isOperational || err.statusCode
            ? err.message
            : 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message,
        // Include stack trace only in development for debugging
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = { errorHandler, AppError };
