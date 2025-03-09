const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['interviewer', 'candidate'], required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
