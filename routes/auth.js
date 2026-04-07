
const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, username: admin.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify Token Route (for frontend checks)
router.get('/verify', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ isValid: false });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) return res.json({ isValid: true });
        return res.status(401).json({ isValid: false });
    } catch (err) {
        res.status(401).json({ isValid: false });
    }
});

module.exports = router;
