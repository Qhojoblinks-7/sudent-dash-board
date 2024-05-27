const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/studentPortal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to local MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const FAQSchema = new mongoose.Schema({
    question: String,
    answer: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const FAQ = mongoose.model('FAQ', FAQSchema);

const dummyFAQs = [
    {
        question: "What is Lorem Ipsum?",
        answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        question: "Why do we use it?",
        answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    },
    {
        question: "Where does it come from?",
        answer: "Contrary to popular belief, Lorem Ipsum is not simply random text."
    }
];

FAQ.insertMany(dummyFAQs)
    .then(() => {
        console.log('Dummy FAQs inserted successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error inserting dummy FAQs', err);
        mongoose.connection.close();
    });
