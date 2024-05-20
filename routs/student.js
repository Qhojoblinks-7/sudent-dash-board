const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get student data
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get student courses and grades
router.get('/:id/courses', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.json(student.courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
