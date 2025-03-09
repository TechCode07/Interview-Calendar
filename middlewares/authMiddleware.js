const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {sendErrorResponse} = require('../middlewares/responseMiddleware');

// JWT Authentication middleware
exports.authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return sendErrorResponse(res, 401, 'Access Denied. No Token Provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to the request object for use in the controller
        const user = await User.findById(decoded.userId);
        req.user = user;

        next();
    } catch (err) {
        sendErrorResponse(res, 401, 'Invalid or expired token');
    }
};

// Role-based authorization middleware
exports.authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return sendErrorResponse(res, 403, 'Access Denied. You do not have the correct role.');
        }
        next();
    };
};
