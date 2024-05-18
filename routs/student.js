// routes/students.js

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

// Mock data route for testing
router.get('/mock/:id/courses', (req, res) => {
    const mockCourses = [
        { name: "Communication Skills", grade: "A" },
        { name: "African Studies", grade: "B+" },
        { name: "Statistical Methods 101", grade: "A-" },
        { name: "Mathematics in Computer Science", grade: "A+" },
        { name: "Introduction to Computer Programming", grade: "A+" },
        { name: "Electrical Circuit", grade: "B+" },
        { name: "Fundamentals to Computing", grade: "A+" }
    ];
    res.json(mockCourses);
});

module.exports = router;
