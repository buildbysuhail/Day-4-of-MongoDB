const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test")
    .then(() => console.log("MongoDB connected"));

app.use("/api/auth", authRoutes);

app.listen(3005, () => {
    console.log("Server runnning on port 3005");
})