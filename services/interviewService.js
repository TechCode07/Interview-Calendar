const interviewRepository = require('../repositories/interviewRepository');

// Set availability for interviewer
exports.setInterviewerAvailability = async (userId, name, availability) => {
    return interviewRepository.setInterviewerAvailability(userId, name, availability);
};

// Set availability for candidate
exports.setCandidateAvailability = async (userId, name, availability) => {
    return interviewRepository.setCandidateAvailability(userId, name, availability);
};

// Find available slots for a candidate and interviewers
exports.findAvailableSlots = async (candidateId, interviewerIds) => {

    const [candidate, interviewers] = await Promise.all([interviewRepository.findCandidateAvailableSlots(candidateId), interviewRepository.findInterviewerAvailableSlots(interviewerIds)]);
    if (!candidate || !interviewers || !interviewers.length) {
        throw new Error('Candidate or interviewers not found');
    }

    const availableSlots = [];

    // Loop through each day of the week
    for (let day of Object.keys(candidate.availability)) {
        const candidateSlots = candidate.availability[day];
        const interviewerSlots = interviewers.map(i => i.availability[day]).filter(Boolean);

        // Find common available slots between all interviewers and the candidate
        const commonSlots = candidateSlots.filter(slot =>
            interviewerSlots.every(interviewer => interviewer.includes(slot))
        );

        if (commonSlots.length > 0) {
            availableSlots.push({ day, slots: commonSlots });
        }
    }

    return availableSlots;
};
