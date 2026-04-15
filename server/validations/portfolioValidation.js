/**
 * Portfolio Validation Schemas (Zod)
 *
 * These schemas define the shape and constraints for portfolio
 * request bodies. They are consumed by the `validate()` middleware
 * and run BEFORE the request reaches the PortfolioController.
 */

const { z } = require('zod');

// ──────────────────────────────────────────────
// Shared field definitions (DRY)
// ──────────────────────────────────────────────
const portfolioFields = {
    studentName: z
        .string({ required_error: 'Student name is required' })
        .min(1, 'Student name cannot be empty')
        .max(100, 'Student name must be at most 100 characters'),

    teamMembers: z
        .string()
        .max(500, 'Team members must be at most 500 characters')
        .optional(),

    businessName: z
        .string({ required_error: 'Business name is required' })
        .min(1, 'Business name cannot be empty')
        .max(150, 'Business name must be at most 150 characters'),

    description: z
        .string({ required_error: 'Description is required' })
        .min(10, 'Description must be at least 10 characters')
        .max(2000, 'Description must be at most 2000 characters'),

    marketSize: z
        .string({ required_error: 'Market size is required' })
        .min(1, 'Market size cannot be empty')
        .max(200, 'Market size must be at most 200 characters'),

    image: z
        .string()
        .optional(),

    businessBasics: z.object({
        name: z.string().optional(),
        type: z.enum(['Food', 'Beverage', 'Service', 'Hybrid', '']).optional(),
        startDate: z.string().optional(),
        location: z.string().optional()
    }).optional(),

    productOffering: z.object({
        mainItems: z.union([z.string(), z.array(z.string())]).optional(),
        priceRange: z.string().optional(),
        uniqueness: z.string().optional()
    }).optional(),

    customerMarket: z.object({
        targetCustomers: z.string().optional(),
        customerCount: z.union([z.string(), z.number()]).optional(),
        acquisitionChannels: z.union([z.string(), z.array(z.string())]).optional()
    }).optional(),

    operations: z.object({
        prepLocation: z.string().optional(),
        teamSize: z.union([z.number(), z.string()]).optional(),
        toolsUsed: z.union([z.string(), z.array(z.string())]).optional()
    }).optional(),

    salesRevenue: z.object({
        monthlyRevenue: z.union([z.string(), z.number()]).optional(),
        paymentMethods: z.union([z.string(), z.array(z.string())]).optional(),
        peakTimes: z.string().optional()
    }).optional(),

    challenges: z.object({
        topChallenge: z.string().optional(),
        solution: z.string().optional()
    }).optional(),

    learningGrowth: z.object({
        skillsGained: z.union([z.string(), z.array(z.string())]).optional(),
        futurePlans: z.string().optional()
    }).optional(),

    mediaProof: z.object({
        mediaLinks: z.array(z.string()).optional(),
        socialLinks: z.string().optional()
    }).optional()
    whatsappNumber: z.string().optional(),
    shopImages: z.array(z.string()).optional(),
    monthlySalesData: z.array(
        z.object({
            month: z.string().optional(),
            sales: z.union([z.number(), z.string()]).optional()
        })
    ).optional()
};

// ──────────────────────────────────────────────
// POST /api/portfolio/add
// ──────────────────────────────────────────────
const createPortfolioSchema = z.object({
    studentName: portfolioFields.studentName,
    teamMembers: portfolioFields.teamMembers,
    businessName: portfolioFields.businessName,
    description: portfolioFields.description,
    marketSize: portfolioFields.marketSize,
    image: portfolioFields.image,
    businessBasics: portfolioFields.businessBasics,
    productOffering: portfolioFields.productOffering,
    customerMarket: portfolioFields.customerMarket,
    operations: portfolioFields.operations,
    salesRevenue: portfolioFields.salesRevenue,
    challenges: portfolioFields.challenges,
    learningGrowth: portfolioFields.learningGrowth,
    mediaProof: portfolioFields.mediaProof,
    whatsappNumber: portfolioFields.whatsappNumber,
    shopImages: portfolioFields.shopImages,
    monthlySalesData: portfolioFields.monthlySalesData,
});

// ──────────────────────────────────────────────
// PUT /api/portfolio/update/:id
// All fields are optional for partial updates
// ──────────────────────────────────────────────
const updatePortfolioSchema = createPortfolioSchema.partial();

module.exports = { createPortfolioSchema, updatePortfolioSchema };
