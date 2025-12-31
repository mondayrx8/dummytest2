const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    problemStatement: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    targetMarket: {
        type: String
    },
    image: { // <--- NEW FIELD
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);