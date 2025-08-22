const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Always resolve relative to THIS file’s directory
const dbPath = path.join(__dirname, 'audits.db');

// Create or open the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database at', dbPath);
  }
});

// Create the audits table if it does not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS audits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      website_url TEXT,
      report TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Export both the db instance and the dbPath
module.exports = { db, dbPath };
