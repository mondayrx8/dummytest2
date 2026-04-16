const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.post('/enhance', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Sila berikan teks" });

        // Backend akan tarik kunci rahsia dari .env
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const styles = [
            "Sangat profesional dan meyakinkan untuk pelabur",
            "Kreatif, 'catchy', dan sangat menarik perhatian Gen-Z",
            "Fokus kepada penyelesaian masalah (problem-solving) yang unik",
            "Pendek, agresif, dan ala-ala slogan jenama antarabangsa",
            "Santai, jujur, dan menggunakan gaya penceritaan (storytelling)"
        ];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];

        const prompt = `
        Bertindak sebagai pakar copywriter bisnes.
        Idea Asal: "${text}"
        Gaya Penulisan: ${randomStyle}
        
        Tugasan: Baiki idea asal menjadi SATU perenggan/slogan yang memukau mengikut gaya penulisan di atas.
        
        Keluarkan HANYA format JSON yang sah dengan struktur seperti ini:
        {
          "slogan": "ayat yang telah dibaiki letak di sini"
        }
      `;

        const result = await model.generateContent(prompt);
        const parsedData = JSON.parse(result.response.text());

        // Hantar jawapan bersih ke Frontend
        res.json(parsedData);

    } catch (error) {
        console.error("AI Backend Error:", error);

        // Kalau Google tangkap spam (Rate Limit 429)
        if (error.status === 429 || (error.message && error.message.includes('429'))) {
            return res.status(429).json({ error: "AI System is busy due to too many requests. Please wait 1 minute and try again. 🛑" });
        }

        // 2. Tangkap kalau Server Google jem (503 High Demand)  <-- TAMBAH YANG NI
        if (error.status === 503 || (error.message && error.message.includes('503'))) {
            return res.status(503).json({ error: "AI System is full/crowded (High Demand). Please try again later. ⏳" });
        }

        // Kalau error lain
        res.status(500).json({ error: "Failed to process AI from Google server." });
    }
});

module.exports = router;