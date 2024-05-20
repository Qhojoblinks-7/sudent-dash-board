const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Mock database to store registered students
let registeredStudents = [];

app.use(bodyParser.json());

// Endpoint for serving the registration form
app.get('/registration-form', (req, res) => {
    res.sendFile(__dirname + '/registration.html');
});

// Endpoint for handling student registration
app.post('/register', (req, res) => {
    const { name, id, email, password } = req.body;

    // Simulate storing student details in the database
    registeredStudents.push({ name, id, email, password });

    // Send response with student ID
    res.status(200).json({ id });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
