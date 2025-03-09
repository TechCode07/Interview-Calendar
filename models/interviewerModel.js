const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Interviewer schema
const interviewerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    availability: {
        type: Map,
        of: [String],  // Array of time slots for each day, e.g., ["09:00-10:00", "10:00-11:00"]
        required: true,
    },
}, { timestamps: true });

interviewerSchema.index({userId: 1}, {unique: true});
// Create the Interviewer model
const Interviewer = mongoose.model('Interviewer', interviewerSchema);

module.exports = Interviewer;
