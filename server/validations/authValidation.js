/**
 * Authentication Validation Schemas (Zod)
 *
 * These schemas define the shape and constraints for authentication
 * request bodies. They are consumed by the `validate()` middleware
 * and run BEFORE the request reaches the AuthController.
 *
 * Zod provides:
 *   - Type-safe parsing (coerces strings, strips unknown keys)
 *   - Human-readable error messages
 *   - Composable refinements (e.g. password confirmation matching)
 */

const { z } = require('zod');

// ──────────────────────────────────────────────
// POST /api/auth/register
// ──────────────────────────────────────────────
const registerSchema = z
    .object({
        username: z
            .string({ required_error: 'Username is required' })
            .min(3, 'Username must be at least 3 characters')
            .max(30, 'Username must be at most 30 characters')
            .regex(
                /^[a-zA-Z0-9_]+$/,
                'Username can only contain letters, numbers, and underscores'
            ),

        // 👇👇👇 TAMBAH PAS VIP EMAIL DI SINI 👇👇👇
        email: z
            .string({ required_error: 'Email is required' })
            .email('Sila masukkan format e-mel yang sah'),
        // 👆👆👆 ------------------------------- 👆👆👆

        password: z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must be at least 6 characters')
            .max(128, 'Password must be at most 128 characters'),

    });

// ──────────────────────────────────────────────
// POST /api/auth/login
// ──────────────────────────────────────────────
const loginSchema = z.object({
    username: z
        .string({ required_error: 'Username is required' })
        .min(1, 'Username cannot be empty'),

    password: z
        .string({ required_error: 'Password is required' })
        .min(1, 'Password cannot be empty'),
});

module.exports = { registerSchema, loginSchema };
