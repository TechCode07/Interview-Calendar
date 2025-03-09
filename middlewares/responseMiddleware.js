// Send a success response
const sendSuccessResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

// Send an error response
const sendErrorResponse = (res, statusCode, message, error = null) => {
    res.status(statusCode).json({
        success: false,
        message,
        error: error || null,
    });
};

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
};
