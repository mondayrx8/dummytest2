const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/authMiddleware'); // <--- Import the Bouncer

// Public Route (Everyone can read)
router.get('/all', async (req, res) => {
    try {
        const portfolios = await Portfolio.find();
        res.status(200).json(portfolios);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Protected Route (Only logged in users can Add)
router.post('/add', auth, async (req, res) => {
    try {
        // We added 'image' to this line 👇
        const { projectTitle, problemStatement, solution, targetMarket, image } = req.body;
        
        const newPortfolio = new Portfolio({
            projectTitle,
            problemStatement,
            solution,
            targetMarket,
            image // <--- Save it here!
        });
        
        const savedPortfolio = await newPortfolio.save();
        res.status(201).json(savedPortfolio);
    } catch (error) {
        res.status(500).json({ error: "Failed to save" });
    }
});

// Protected Route (Only logged in users can Delete)
router.delete('/delete/:id', auth, async (req, res) => { // <--- Added 'auth'
    try {
        const { id } = req.params;
        await Portfolio.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete" });
    }
});

// Protected Route (Only logged in users can Update)
router.put('/update/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        // The req.body now contains the image, so MongoDB will update it automatically
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedPortfolio);
    } catch (error) {
        res.status(500).json({ error: "Failed to update" });
    }
});

module.exports = router;