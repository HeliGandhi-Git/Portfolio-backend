
const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    icon: { type: String }, // Emoji or URL (Optional)
    category: { type: String, required: true }, // e.g., "Languages & Frameworks", "Tools & Technologies"
});

module.exports = mongoose.model('Skill', SkillSchema);
