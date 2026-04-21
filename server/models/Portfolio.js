const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // --- NEW FIELD: TEAM MEMBERS ---
    teamMembers: {
        type: String, // e.g., "Ali (Marketing), Sarah (Tech)"
        required: false // Optional, because some students are solo
    },
    // -------------------------------
    businessName: {
        type: String,
        required: true
    },
    whatsappNumber: {
        type: String,
        required: false
    },
    monthlySalesData: [{
        month: { type: String },
        sales: { type: Number }
    }],
    shopImages: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    marketSize: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    businessBasics: {
        name: { type: String },
        type: { type: String, enum: ['Food', 'Beverage', 'Service', 'Hybrid', ''] },
        startDate: { type: String },
        location: { type: String }
    },
    productOffering: {
        mainItems: { type: mongoose.Schema.Types.Mixed },
        priceRange: { type: String },
        uniqueness: { type: String }
    },
    customerMarket: {
        targetCustomers: { type: String },
        customerCount: { type: mongoose.Schema.Types.Mixed },
        acquisitionChannels: { type: mongoose.Schema.Types.Mixed }
    },
    operations: {
        prepLocation: { type: String },
        teamSize: { type: mongoose.Schema.Types.Mixed },
        toolsUsed: { type: mongoose.Schema.Types.Mixed }
    },
    salesRevenue: {
        monthlyRevenue: { type: mongoose.Schema.Types.Mixed },
        paymentMethods: { type: mongoose.Schema.Types.Mixed },
        peakTimes: { type: String }
    },
    challenges: {
        topChallenge: { type: String },
        solution: { type: String }
    },
    learningGrowth: {
        skillsGained: { type: mongoose.Schema.Types.Mixed },
        futurePlans: { type: String }
    },
    mediaProof: {
        mediaLinks: [{ type: String }],
        socialLinks: { type: String }
    },

    landingPage: {
        introduction: { type: String },
        aboutUs: { type: String },
        founder: { type: String },
        missionVision: { type: String },
        keyProductsServices: { type: String },
        targetMarket: { type: String },
        ourTeam: { type: String },
        ourGoals: { type: String },
        companyService: { type: String },
        bestAchievement: { type: String },
        futureOutlook: { type: String },
        contactInfo: {
            address: { type: String },
            email: { type: String },
            socialMedia: { type: String }
        }
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);