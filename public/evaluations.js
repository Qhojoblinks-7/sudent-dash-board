const express = require('express');
const Evaluation = require('../models/Evaluation');
const authenticate = require('./auth').authenticate;

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    const { lecturerName, questions } = req.body;
    const evaluation = new Evaluation({ lecturerName, questions, studentId: req.userId });

    try {
        await evaluation.save();
        res.status(201).json({ message: 'Evaluation submitted successfully!' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to submit evaluation' });
    }
});

router.get('/', authenticate, async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ studentId: req.userId });
        res.json(evaluations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch evaluations' });
    }
});

module.exports = router;
