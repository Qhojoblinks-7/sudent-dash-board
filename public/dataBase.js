// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./auth.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT,
        department TEXT,
        course TEXT,
        email TEXT UNIQUE,
        studentId TEXT,
        password TEXT
    )`);
});

module.exports = db;
