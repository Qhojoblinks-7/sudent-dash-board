const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/studentPortal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to local MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const UserSchema = new mongoose.Schema({
    fullName: String,
    department: String,
    course: String,
    email: { type: String, unique: true },
    studentId: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    summary: String,
    coverImage: String,
    available: Boolean,
    borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);

const ReplySchema = new mongoose.Schema({
    reply: String,
    repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
});

const ComplaintSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    complaint: String,
    date: { type: Date, default: Date.now },
    replies: [ReplySchema],
});

const Complaint = mongoose.model('Complaint', ComplaintSchema);

const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', NotificationSchema);

const FAQSchema = new mongoose.Schema({
    question: String,
    answer: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const FAQ = mongoose.model('FAQ', FAQSchema);

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
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful!', token });
    } else {
        res.status(401).json({ error: 'Invalid email or password!' });
    }
});

function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.userId = decodedToken.userId;
        next();
    });
}

app.get('/api/studentDashboard', authenticate, (req, res) => {
    res.json({ message: 'Welcome to the dashboard!' });
});

app.get('/api/books', authenticate, async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

app.post('/api/books', authenticate, async (req, res) => {
    const { title, author, isbn, summary, coverImage, available } = req.body;
    try {
        const book = new Book({ title, author, isbn, summary, coverImage, available });
        await book.save();
        res.status(201).json({ message: 'Book added successfully!' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to add book' });
    }
});

app.put('/api/books/:id/borrow', authenticate, async (req, res) => {
    const { userId } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (book.available) {
            book.available = false;
            book.borrowedBy = userId;
            await book.save();
            res.json({ message: 'Book borrowed successfully!' });
        } else {
            res.status(400).json({ error: 'Book is not available' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to borrow book' });
    }
});

app.put('/api/books/:id/return', authenticate, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book.available && book.borrowedBy.toString() === req.body.userId) {
            book.available = true;
            book.borrowedBy = null;
            await book.save();
            res.json({ message: 'Book returned successfully!' });
        } else {
            res.status(400).json({ error: 'Book is not borrowed by you' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to return book' });
    }
});

app.post('/api/complaints', authenticate, async (req, res) => {
    const { complaint } = req.body;
    const userId = req.userId;

    try {
        const newComplaint = new Complaint({ userId, complaint });
        await newComplaint.save();
        res.status(201).json({ message: 'Complaint submitted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit complaint' });
    }
});

app.get('/api/complaints', authenticate, async (req, res) => {
    try {
        const complaints = await Complaint.find({ userId: req.userId }).populate('replies.repliedBy', 'fullName');
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve complaints' });
    }
});

app.post('/api/complaints/:id/replies', authenticate, async (req, res) => {
    const { reply } = req.body;
    const complaintId = req.params.id;
    const userId = req.userId;

    try {
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        complaint.replies.push({
            reply,
            repliedBy: userId,
        });
        await complaint.save();
        res.json({ message: 'Reply added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add reply' });
    }
});

app.get('/api/faqs', authenticate, async (req, res) => {
    try {
        const faqs = await FAQ.find().sort({ createdAt: -1 });
        res.json(faqs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch FAQs' });
    }
});

app.put('/api/faqs/:id', authenticate, async (req, res) => {
    const { question, answer } = req.body;
    try {
        const faq = await FAQ.findById(req.params.id);
        if (faq) {
            faq.question = question || faq.question;
            faq.answer = answer || faq.answer;
            faq.updatedAt = Date.now();
            await faq.save();
            res.json({ message: 'FAQ updated successfully!' });
        } else {
            res.status(404).json({ error: 'FAQ not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update FAQ' });
    }
});

app.get('/api/notifications', authenticate, async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

app.put('/api/notifications/:id/read', authenticate, async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification && notification.userId.toString() === req.userId) {
            notification.read = true;
            await notification.save();
            res.json({ message: 'Notification marked as read' });
        } else {
            res.status(404).json({ error: 'Notification not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homePage.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
