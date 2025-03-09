const Joi = require('joi');

// Schema for availability slots
const availabilitySchema = Joi.object({
    Monday: Joi.array().items(Joi.string().regex(/^([0-9]{2}):([0-9]{2})-([0-9]{2}):([0-9]{2})$/)).required(),
    Tuesday: Joi.array().items(Joi.string().regex(/^([0-9]{2}):([0-9]{2})-([0-9]{2}):([0-9]{2})$/)).required(),
    Wednesday: Joi.array().items(Joi.string().regex(/^([0-9]{2}):([0-9]{2})-([0-9]{2}):([0-9]{2})$/)).required(),
    Thursday: Joi.array().items(Joi.string().regex(/^([0-9]{2}):([0-9]{2})-([0-9]{2}):([0-9]{2})$/)).required(),
    Friday: Joi.array().items(Joi.string().regex(/^([0-9]{2}):([0-9]{2})-([0-9]{2}):([0-9]{2})$/)).required(),
});

// Schema for setting availability (interviewers and candidates)
const setAvailabilitySchema = Joi.object({
    availability: availabilitySchema.required(),
});

// Schema for scheduling interviews (with interviewer and candidate details)
const scheduleInterviewSchema = Joi.object({
    candidateId: Joi.string().required(),
    interviewerIds: Joi.array().items(Joi.string()).required(),
});

module.exports = {
    setAvailabilitySchema,
    scheduleInterviewSchema
};
