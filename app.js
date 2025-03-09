const express = require('express');
const { swaggerSpec, swaggerUi } = require('./swagger'); // Import Swagger setup
const interviewRoutes = require('./routes/interviewRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const winston = require('./utils/logger');
const connectDB = require('./utils/connectDb');


// Load environment variables from .env file
dotenv.config();

//Initialize DB
connectDB();

// Initialize Express app
const app = express();


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Swagger to serve documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/interview', interviewRoutes);

// Global error handling
app.use((err, req, res, next) => {
    winston.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    winston.info(`Server running on port ${PORT}`);
});
