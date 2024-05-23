const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/auth-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    fullName: String,
    department: String,
    course: String,
    email: { type: String, unique: true },
    studentId: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/api/signup', async (req, res) => {
    const { fullName, department, course, email, studentId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({
            fullName,
            department,
            course,
            email,
            studentId,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ error: 'User registration failed!' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ message: 'Login successful!', token });
    } else {
        res.status(401).json({ error: 'Invalid email or password!' });
    }
});

function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.userId = decodedToken.userId;
        next();
    });
}

app.get('/api/dashboard', authenticate, (req, res) => {
    // Route logic for the dashboard
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for any other routes (client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homePage.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
