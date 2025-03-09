const Interviewer = require('../models/interviewerModel');
const Candidate = require('../models/candidateModel');
const { Types } = require('mongoose');

// Set Interviewer Availability
exports.setInterviewerAvailability = async (userId, name, availability) => {
    const interviewer = new Interviewer({
        userId,
        name,
        availability, // Availability will be a Map where days are keys and time slots are values
    });

    await interviewer.save();
    return interviewer;
};

// Set Candidate Availability
exports.setCandidateAvailability = async (userId, name, availability) => {
    const candidate = new Candidate({
        userId,
        name,
        availability, // Availability will be a Map where days are keys and time slots are values
    });

    await candidate.save();
    return candidate;
};

// Find Candidate Available Slots
exports.findCandidateAvailableSlots = async (candidateId) => {
    const candidate = await Candidate.findOne({userId: new Types.ObjectId(candidateId)}).lean();
    return candidate;
};

// Find Interviewers Available Slots
exports.findInterviewerAvailableSlots = async (interviewerIds) => {
    interviewerIds = interviewerIds.map(id => (new Types.ObjectId(id) ));
    const interviewers = await Interviewer.find({ userId: { $in: interviewerIds } }).lean();
    return interviewers;
};