const User = require('../models/userModel');

// Create a new user
exports.createUser = async (name, email, password, role) => {
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    return newUser;
};

// Find user by email
exports.findUserByEmail = async (email) => {
    return User.findOne({ email });
};

// Find user by id
exports.findUserById = async (id) => {
    return User.findById(id);
};
