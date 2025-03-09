const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Candidate schema
const candidateSchema = new Schema({
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
        of: [String],  // Array of time slots for each day, e.g., ["09:00-10:00", "10:00-12:00"]
        required: true,
    },
}, { timestamps: true });

candidateSchema.index({ userId: 1 }, { unique: true });

// Create the Candidate model
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
