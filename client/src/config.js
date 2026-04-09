/**
 * Client Configuration — Centralized API URL
 *
 * This module dynamically resolves the API base URL based on the
 * current environment, eliminating hardcoded URLs across components.
 *
 * Priority order:
 *   1. VITE_API_URL environment variable (set in .env or CI/CD)
 *   2. Fallback based on Vite's `import.meta.env.MODE`
 *
 * Usage in components:
 *   import { API_URL } from '../config';
 *   await axios.get(`${API_URL}/portfolio/all`);
 *
 * Environment setup:
 *   - Development: Create `client/.env.development` with:
 *       VITE_API_URL=http://localhost:5000/api/v1
 *
 *   - Production: Create `client/.env.production` with:
 *       VITE_API_URL=http://149.118.146.248:5000/api/v1
 *
 *   - Or set VITE_API_URL in your deployment platform (Vercel, Render, etc.)
 */

const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === 'production'
        ? 'http://149.118.146.248:5000/api'
        : 'http://localhost:5000/api');

export { API_URL };
