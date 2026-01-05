// import
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');


// Set up Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/testdb')
    .then(() => console.log('MongoDB connected'))
    .catch( err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/posts', postRoutes);

// Start server
app.listen(3002, ()=> {
    console.log('Server running on port 3002');
})

