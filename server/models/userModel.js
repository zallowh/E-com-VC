// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String // Store the base64 string or the path to the uploaded image
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
