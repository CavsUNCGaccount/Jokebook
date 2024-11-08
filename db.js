const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create and open the database
const dbPath = path.resolve(__dirname, 'jokes.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Export to use in model
module.exports = db;
