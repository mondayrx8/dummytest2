/**
 * Reusable Zod Validation Middleware Factory
 *
 * Usage in route files:
 *   const validate = require('../middleware/validate');
 *   const { loginSchema } = require('../validations/authValidation');
 *
 *   router.post('/login', validate(loginSchema), controller.login);
 *
 * How it works:
 *   1. Receives a Zod schema as an argument.
 *   2. Returns an Express middleware function.
 *   3. The middleware parses `req.body` against the schema.
 *   4. On success: replaces `req.body` with the parsed (cleaned) data
 *      and calls `next()`.
 *   5. On failure: passes the ZodError to `next(error)`, which the
 *      global errorHandler middleware will format as a 400 response.
 *
 * Benefits:
 *   - Validation is declared at the route level, keeping controllers thin
 *   - Invalid data NEVER reaches the controller/service layer
 *   - Zod's `.parse()` strips unknown fields and coerces types
 *   - Error formatting is handled centrally by errorHandler.js
 */

/**
 * @param {import('zod').ZodSchema} schema - A Zod schema to validate against
 * @returns {import('express').RequestHandler} Express middleware
 */
const validate = (schema) => {
    return (req, res, next) => {
        try {
            // `.parse()` throws a ZodError if validation fails.
            // On success, it returns the parsed & cleaned data.
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            // Forward the ZodError to the global error handler
            next(error);
        }
    };
};

module.exports = validate;
