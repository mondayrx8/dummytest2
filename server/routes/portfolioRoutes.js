const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/authMiddleware');

// Public Route (Read All)
router.get('/all', async (req, res) => {
    try {
        const portfolios = await Portfolio.find();
        res.status(200).json(portfolios);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Protected Route (Create)
router.post('/add', auth, async (req, res) => {
    try {
        // 1. Destructure the NEW fields
        const { studentName, teamMembers, businessName, description, marketSize, image } = req.body;

        // 2. Create the object with NEW fields
        const newPortfolio = new Portfolio({
            studentName,
            teamMembers,
            businessName,
            description,
            marketSize,
            image
        });

        const savedPortfolio = await newPortfolio.save();
        res.status(201).json(savedPortfolio);
    } catch (error) {
        // 3. LOG THE REAL ERROR to the terminal so we can see it
        console.error("Error Saving Portfolio:", error.message);
        res.status(400).json({ error: error.message }); // Send 400 with the specific error message
    }
});

// Protected Route (Delete)
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Portfolio.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete" });
    }
});

// Protected Route (Update)
router.put('/update/:id', auth, async (req, res) => {
    try {
        // The req.body automatically contains the new fields, so this should work
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPortfolio);
    } catch (error) {
        res.status(500).json({ error: "Failed to update" });
    }
});

module.exports = router;