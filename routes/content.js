
const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Resume = require('../models/Resume');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

// --- Public Routes ---

// Get All Skills
router.get('/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get All Projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get All Experiences
router.get('/experiences', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ index: 1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Protected Routes (Admin Only) ---

// Add Skill
router.post('/skills', auth, async (req, res) => {
    try {
        const newSkill = new Skill(req.body);
        const savedSkill = await newSkill.save();
        res.json(savedSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Skill
router.delete('/skills/:id', auth, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add Project
router.post('/projects', auth, async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Project
router.delete('/projects/:id', auth, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add Experience
router.post('/experiences', auth, async (req, res) => {
    try {
        const newExperience = new Experience(req.body);
        const savedExperience = await newExperience.save();
        res.json(savedExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Experience
router.delete('/experiences/:id', auth, async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: 'Experience deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Skill
router.put('/skills/:id', auth, async (req, res) => {
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update Project
router.put('/projects/:id', auth, async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update Experience
router.put('/experiences/:id', auth, async (req, res) => {
    try {
        const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- Resume Routes ---

// Get Resume
router.get('/resume', async (req, res) => {
    try {
        const resume = await Resume.findOne().sort({ uploadDate: -1 });
        res.json(resume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add or Update Resume
router.post('/resume', auth, async (req, res) => {
    try {
        const { resumeUrl, filename } = req.body;
        let resume = await Resume.findOne();
        if (resume) {
            resume.resumeUrl = resumeUrl;
            resume.filename = filename;
            resume.uploadDate = Date.now();
            await resume.save();
        } else {
            resume = new Resume({ resumeUrl, filename });
            await resume.save();
        }
        res.json(resume);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
