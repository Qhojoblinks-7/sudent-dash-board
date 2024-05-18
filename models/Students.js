// models/Student.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: String,
    grade: String,
});

const StudentSchema = new mongoose.Schema({
    name: String,
    profilePic: String,
    courses: [CourseSchema],
    gpa: [Number],
});

module.exports = mongoose.model('Student', StudentSchema);
