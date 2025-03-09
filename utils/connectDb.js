const mongoose = require('mongoose');
require('dotenv').config();

// Get MongoDB URI from environment variables
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interview-calendar';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error connecting to database:', error.message, dbURI);
        process.exit(1); // Exit the process with failure code
    }
};

module.exports = connectDB;
