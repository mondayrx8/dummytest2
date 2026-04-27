const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.post('/enhance', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Please provide text" });

        // Backend akan tarik kunci rahsia dari .env
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const styles = [
            "Highly professional, authoritative, and convincing for angel investors",
            "Corporate, articulate, and focuses on core mission and values",
            "Sophisticated, clear, and highlights business expertise and innovation",
            "Formal, polished, and structured for a B2B audience"
        ];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];

        const prompt = `
        Act as an expert corporate copywriter.
        Original Draft: "${text}"
        Writing Style: ${randomStyle}
        
        Task: Enhance and expand the original draft into a compelling and highly professional 'About Us' company description. Ensure impeccable grammar, clear structure, and an engaging corporate tone. Do not make it a short slogan; it should be a solid, well-written paragraph representing a serious business.
        
        Output ONLY the valid JSON format with this structure:
        {
          "slogan": "improved 'About Us' text goes here"
        }
      `;

        const result = await model.generateContent(prompt);
        const parsedData = JSON.parse(result.response.text());

        // send cleaned data to Frontend
        res.json(parsedData);

    } catch (error) {
        console.error("AI Backend Error:", error);

        // If Google catch spam (Rate Limit 429)
        if (error.status === 429 || (error.message && error.message.includes('429'))) {
            return res.status(429).json({ error: "AI System is busy due to too many requests. Please wait 1 minute and try again. 🛑" });
        }

        // If Google Server full (High Demand)
        if (error.status === 503 || (error.message && error.message.includes('503'))) {
            return res.status(503).json({ error: "AI System is full/crowded (High Demand). Please try again later. ⏳" });
        }

        // If other error
        res.status(500).json({ error: "Failed to process AI from Google server." });
    }
});

module.exports = router;