const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER (Sign Up)
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // SECURITY: Hash the password (Salt + Hash)
        // 10 is the "Salt Rounds" (Complexity cost)
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// 2. LOGIN (Sign In)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "User not found" });

        // SECURITY: Compare the typed password with the Hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate Token (The "ID Badge")
        // 'SECRET_KEY' should be in .env file in real life, but for now we hardcode it for simplicity
        const token = jwt.sign({ id: user._id }, "MY_SUPER_SECRET_KEY", { expiresIn: "1h" });

        res.json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;