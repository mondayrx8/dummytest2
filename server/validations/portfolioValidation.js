/**
 * Portfolio Validation Schemas (Zod)
 *
 * Sesuai dengan struktur "Landing Page 0-9" yang baru.
 */

const { z } = require('zod');

// ──────────────────────────────────────────────
// Shared field definitions (Mengikut Schema 0-9)
// ──────────────────────────────────────────────
const portfolioFields = {

    // 0. Business Name (Satu-satunya yang WAJIB)
    businessName: z
        .string({ required_error: 'Business name is required' })
        .min(1, 'Business name cannot be empty')
        .max(150, 'Business name must be at most 150 characters'),

    // 1. Slogan
    slogan: z.string().optional(),

    // 2. About Us
    aboutUs: z.string().optional(),

    // 3. Mission & Vision
    missionVision: z.object({
        mission: z.string().optional(),
        vision: z.string().optional(),
        graphicInfo: z.string().optional()
    }).optional(),

    // 4. Our Team (Array of Objects)
    ourTeam: z.array(
        z.object({
            name: z.string().optional(),
            role: z.string().optional(),
            description: z.string().optional(),
            image: z.string().optional()
        })
    ).optional(),

    // 5. Our Services (Array of Objects)
    ourServices: z.array(
        z.object({
            serviceName: z.string().optional(),
            description: z.string().optional()
        })
    ).optional(),

    // 6. Products (Array of Images)
    products: z.array(
        z.object({
            image: z.string().optional()
        })
    ).optional(),

    // 7. Target Market
    targetMarket: z.object({
        tam: z.string().optional(),
        sam: z.string().optional(),
        som: z.string().optional()
    }).optional(),

    // 8. Achievements (Array of Objects)
    achievements: z.array(
        z.object({
            description: z.string().optional(),
            image: z.string().optional()
        })
    ).optional(),

    // 9. Contact Info & Socials
    contactInfo: z.object({
        phone: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        website: z.string().optional(),
        socials: z.object({
            tiktok: z.string().optional(),
            instagram: z.string().optional(),
            twitter: z.string().optional(),
            facebook: z.string().optional(),
            threads: z.string().optional()
        }).optional()
    }).optional()
};

// ──────────────────────────────────────────────
// POST /api/portfolio/add
// ──────────────────────────────────────────────
const createPortfolioSchema = z.object(portfolioFields);

// ──────────────────────────────────────────────
// PUT /api/portfolio/update/:id
// All fields are optional for partial updates
// ──────────────────────────────────────────────
const updatePortfolioSchema = createPortfolioSchema.partial();

module.exports = { createPortfolioSchema, updatePortfolioSchema };