const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const cors = require("cors");


// Middleware
app.use(express.json());  // For parsing JSON data
app.use(cookieParser());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.use(cors());

// Connect to MongoDB (make sure dbConnect function is imported properly)
const dbConnect = require('./config/dbConnect');
dbConnect();

// Set up the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
