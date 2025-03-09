const userService = require('../services/userService');
const { sendSuccessResponse, sendErrorResponse } = require('../middlewares/responseMiddleware');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        await userService.registerUser(name, email, password, role);
        sendSuccessResponse(res, 201, 'User registered successfully');
    } catch (err) {
        sendErrorResponse(res, 400, err.message);
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token } = await userService.loginUser(email, password);
        sendSuccessResponse(res, 200, 'Login successful', { token });
    } catch (err) {
        sendErrorResponse(res, 400, err.message);
    }
};
