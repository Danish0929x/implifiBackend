const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db/conn');
const cors = require('cors');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors());


// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Register the authentication routes
app.use('/auth', authRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
