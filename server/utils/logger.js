/**
 * Professional Logger (Winston)
 *
 * Replaces all `console.log` / `console.error` calls throughout the
 * backend with structured, leveled logging.
 *
 * Features:
 *   - Color-coded, human-readable output in development
 *   - JSON output in production (for log aggregators like Datadog/ELK)
 *   - Automatic timestamp on every log entry
 *   - Defined log levels: error, warn, info, http, debug
 *
 * Usage:
 *   const logger = require('./utils/logger');
 *   logger.info('Server started on port 5000');
 *   logger.error('Database connection failed', { error: err.message });
 *   logger.warn('Deprecated route accessed');
 *   logger.debug('Payload received', { body: req.body });
 */

const { createLogger, format, transports } = require('winston');

// ──────────────────────────────────────────────
// Determine environment
// ──────────────────────────────────────────────
const isProduction = process.env.NODE_ENV === 'production';

// ──────────────────────────────────────────────
// Custom format for development (clean & readable)
// ──────────────────────────────────────────────
const devFormat = format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: 'HH:mm:ss' }),
    format.printf(({ timestamp, level, message, ...meta }) => {
        const metaStr = Object.keys(meta).length
            ? `\n  ${JSON.stringify(meta, null, 2)}`
            : '';
        return `${timestamp} ${level}: ${message}${metaStr}`;
    })
);

// ──────────────────────────────────────────────
// Custom format for production (structured JSON)
// ──────────────────────────────────────────────
const prodFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
);

// ──────────────────────────────────────────────
// Create the logger instance
// ──────────────────────────────────────────────
const logger = createLogger({
    level: isProduction ? 'info' : 'debug',
    format: isProduction ? prodFormat : devFormat,
    transports: [
        new transports.Console(),
    ],
    // Prevent unhandled exceptions from crashing silently
    exceptionHandlers: [
        new transports.Console(),
    ],
});

module.exports = logger;
