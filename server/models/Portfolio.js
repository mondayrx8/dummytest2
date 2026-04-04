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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);