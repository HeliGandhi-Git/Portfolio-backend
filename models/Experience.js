
const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    duration: { type: String, required: true },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    description: { type: String, required: true },
    index: { type: Number, default: 0 } // To maintain order if needed
});

module.exports = mongoose.model('Experience', ExperienceSchema);
