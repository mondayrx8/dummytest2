/**
 * Centralized Environment Configuration (Zod-validated)
 *
 * This module validates ALL required environment variables at server
 * startup using Zod. If any variable is missing or invalid, the
 * process exits immediately with a clear, descriptive error message.
 *
 * Why this matters:
 *   - Fail-fast: A missing MONGO_URI won't surface as a cryptic
 *     runtime crash 5 minutes into production — it fails at boot.
 *   - Single source of truth: Every file imports `env` from here
 *     instead of scattering `process.env.X` across the codebase.
 *   - Type safety: Zod coerces `PORT` from string → number, and
 *     provides defaults where appropriate.
 *
 * Usage:
 *   const env = require('./config/env');
 *   mongoose.connect(env.MONGO_URI);
 */

const { z } = require('zod');

// ──────────────────────────────────────────────
// Define the schema for required env variables
// ──────────────────────────────────────────────
const envSchema = z.object({
    // Server
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),

    PORT: z
        .string()
        .default('5000')
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val) && val > 0 && val < 65536, {
            message: 'PORT must be a valid number between 1 and 65535',
        }),

    // Database
    MONGO_URI: z
        .string({ required_error: '❌ MONGO_URI is required in .env' })
        .min(1, '❌ MONGO_URI cannot be empty')
        .url('❌ MONGO_URI must be a valid connection string'),

    // Authentication
    JWT_SECRET: z
        .string({ required_error: '❌ JWT_SECRET is required in .env' })
        .min(16, '❌ JWT_SECRET must be at least 16 characters for security'),

    JWT_EXPIRY: z
        .string()
        .default('1h'),
});

// ──────────────────────────────────────────────
// Parse and validate environment variables
// ──────────────────────────────────────────────
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('');
    console.error('╔══════════════════════════════════════════════════╗');
    console.error('║     ⚠️  ENVIRONMENT CONFIGURATION ERROR  ⚠️      ║');
    console.error('╠══════════════════════════════════════════════════╣');

    parsed.error.issues.forEach((issue) => {
        console.error(`║  ${issue.path.join('.')}: ${issue.message}`);
    });

    console.error('╠══════════════════════════════════════════════════╣');
    console.error('║  Fix your .env file and restart the server.     ║');
    console.error('╚══════════════════════════════════════════════════╝');
    console.error('');

    process.exit(1);
}

module.exports = parsed.data;
