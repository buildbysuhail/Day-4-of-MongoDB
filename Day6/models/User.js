// User model is required for auth // 1st
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});

module.exports = mongoose.model("User", userSchema);
