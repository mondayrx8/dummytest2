const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    studentName: { // <--- NEW: The Entrepreneur's Name
        type: String,
        required: true
    },
    businessName: { // <--- NEW: The Startup's Name
        type: String,
        required: true
    },
    description: { // <--- NEW: Replaces "Problem/Solution" for a cleaner pitch
        type: String,
        required: true
    },
    marketSize: { // <--- NEW: From your Design Doc Table 1
        type: String,
        required: true
    },
    image: {
        type: String // Base64 String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);