const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // No two users can have the same name
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' // Automatically become normal user
    }
    // We don't store "confirmPassword" - that is only for the frontend check  
});

module.exports = mongoose.model('User', userSchema);