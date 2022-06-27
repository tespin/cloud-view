const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

async function main(cb) {
    const URI = process.env.MONGO_URI;

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewURLParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error(error);
    }

    // mongoose.connect(`mongodb://${server}/${database}`)
    // .then(() => {
    //   console.log('Database connection successful')
    // })
    // .catch(err => {
    //   console.error('Database connection error')
    // })

    // const client = new MongoClient(URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true });

    // try {
    //     await client.connect();
    //     await cb(client);
    // } catch (e) {
    //     console.error(e);
    //     throw new Error('Unable to connect to database');
    // }
}
// const sqlite3 = require('sqlite3');
// const mkdirp = require('mkdirp');
// const crypto = require('crypto');

// mkdirp.sync('./var/db');

// const db = new sqlite3.Database('./var/db/gallery.db');

// db.serialize( () => {
//     db.run("CREATE TABLE IF NOT EXISTS users ( \
//         id INTEGER PRIMARY KEY, \
//         username TEXT UNIQUE, \
//         hashed_password BLOB, \
//         salt BLOB, \
//         name TEXT, \
//         email TEXT UNIQUE, \
//         email_verified INTEGER \ )"
//     );
    
//     db.run("CREATE TABLE IF NOT EXISTS federated_credentials ( \
//         id INTEGER PRIMARY KEY, \
//         user_id INTEGER NOT NULL, \
//         provider TEXT NOT NULL, \
//         subject TEXT NOT NULL, \
//         UNIQUE (provider, subject) \ )"
//     );
    
//     db.run("CREATE TABLE IF NOT EXISTS saved ( \
//         id INTEGER PRIMARY KEY, \
//         owner_id INTEGER NOT NULL, \
//         date TEXT NOT NULL, \
//         image BLOB \ )"
//     );

//     let salt = crypto.randomBytes(16);
//     db.run("INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)", [
//         'test',
//         crypto.pbkdf2Sync('password', salt, 310000, 32, 'sha256'),
//         salt
//     ]);
// });

module.exports = main;