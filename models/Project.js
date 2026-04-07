
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: [String],
    linkType: { type: String, enum: ['github', 'live', 'none'], default: 'none' },
    url: { type: String, default: '' },
});

module.exports = mongoose.model('Project', ProjectSchema);
