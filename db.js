const sqlite3 = require('better-sqlite3');
const mkdirp = require('mkdirp');
const crypto = require('crypto');

mkdirp.sync('./var/db');

const db = new sqlite3('./var/db/gallery.db', { verbose: console.log});

db.serialize( () => {
    db.prepare("CREATE TABLE IF NOT EXISTS users ( \
        id INTEGER PRIMARY KEY, \
        username TEXT UNIQUE, \
        hashed_password BLOB, \
        salt BLOB, \
        name TEXT, \
        email TEXT UNIQUE, \
        email_verified INTEGER \ )"
    ).run();
    
    const federated = db.prepare("CREATE TABLE IF NOT EXISTS federated_credentials ( \
        id INTEGER PRIMARY KEY, \
        user_id INTEGER NOT NULL, \
        provider TEXT NOT NULL, \
        subject TEXT NOT NULL, \
        UNIQUE (provider, subject) \ )"
    ).run();
    
    const saved = db.prepare("CREATE TABLE IF NOT EXISTS saved ( \
        id INTEGER PRIMARY KEY, \
        owner_id INTEGER NOT NULL, \
        date TEXT NOT NULL, \
        image BLOB \ )"
    ).run();

    let salt = crypto.randomBytes(16);
    db.prepare("INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)", [
        'testAccount',
        crypto.pbkdf2Sync('password', salt, 310000, 32, 'sha256'),
        salt
    ]);
});

module.exports = db;