const { sendSuccessResponse, sendErrorResponse } = require('../middlewares/responseMiddleware');
const interviewService = require('../services/interviewService');
const { setAvailabilitySchema, scheduleInterviewSchema } = require('../validation/interviewValidation');

// Set availability for interviewer
exports.setInterviewerAvailability = async (req, res) => {
    try {
        // Validate request body using the validation function from validation layer
        const { error } = setAvailabilitySchema.validate(req.body);
        if (error) {
            return sendErrorResponse(res, 400, 'Validation error', error.details);
        }

        const { availability } = req.body;
        const { _id, name } = req.user;
        const result = await interviewService.setInterviewerAvailability(_id, name, availability);
        sendSuccessResponse(res, 201, 'Interviewer availability set successfully', result);
    } catch (err) {
        sendErrorResponse(res, 500, 'Error setting interviewer availability', err.message);
    }
};

// Set availability for candidate
exports.setCandidateAvailability = async (req, res) => {
    try {
        // Validate request body using the validation function from validation layer
        const { error } = setAvailabilitySchema.validate(req.body);
        if (error) {
            return sendErrorResponse(res, 400, 'Validation error', error.details);
        }

        const { availability } = req.body;
        const { _id, name } = req.user;
        const result = await interviewService.setCandidateAvailability(_id, name, availability);
        
        sendSuccessResponse(res, 201, 'Candidate availability set successfully', result);
    } catch (err) {
        sendErrorResponse(res, 500, 'Error setting candidate availability', err.message);
    }
};

// Find common available slots for interview
exports.findAvailableSlots = async (req, res) => {
    try {
        // Validate request body using the validation function from validation layer
        const { error } = scheduleInterviewSchema.validate(req.body);
        if (error) {
            return sendErrorResponse(res, 400, 'Validation error', error.details);
        }

        const { candidateId, interviewerIds } = req.body;
        const result = await interviewService.findAvailableSlots(candidateId, interviewerIds);
        sendSuccessResponse(res, 200, 'Available interview slots', result);
    } catch (err) {
        sendErrorResponse(res, 500, 'Error finding available slots', err.message);
    }
};
