
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    resumeUrl: { type: String, required: true },
    filename: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', ResumeSchema);
