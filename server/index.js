const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // <--- 1. NEW IMPORT
require('dotenv').config();

const app = express();

// 2. USE BODY PARSER INSTEAD OF EXPRESS.JSON
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Import Routes
const portfolioRoutes = require('./routes/portfolioRoutes');
const authRoutes = require('./routes/authRoutes');

// Use Routes
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully!"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // 3. THIS MESSAGE PROVES THE NEW CODE IS RUNNING
    console.log(`Server is running on port ${PORT} (50MB Limit Active)`); 
});