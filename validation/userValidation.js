const Joi = require('joi');

// Validation schema for user registration
exports.registerUserValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('interviewer', 'candidate').required(),
    });
    return schema.validate(data);
};

// Validation schema for user login
exports.loginUserValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
};
