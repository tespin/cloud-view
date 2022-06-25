const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
// let crypto = require('crypto');
let db = require('../db');
const app = require('../app');
const objectID = require('mongodb').ObjectId;
const router = express.Router();

db(async client => {
    const myDataBase = await client.db('database').collection('users');

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };

    passport.serializeUser( function(user, cb) {
        cb(null, user.id);
    })

    passport.deserializeUser( function(id, cb) {
        myDataBase.findOne({ _id: new ObjectID(id)}, function(err, doc) {
            cb(null, doc);
        });
    });

    passport.use(new LocalStrategy( function(username, password, cb) {
        myDataBase.findOne( {username: username}, function(err, user) {
            console.log(`User ${username} attempted to log in.`);
            if (err) { return cb(err); }
            if (!user) { return cb(null, false, { message: 'Incorrect username or password'}); }

            if (!bcrypt.compareSync(password, user.password)) {
                return cb(null, false, { message: 'Incorrect username or password'});
            }
        });
    }));

    router.post('/signup', function(req, res, next) {
        console.log(`attempting signup ${req.body.username}`);
        myDataBase.findOne({ username: req.body.username}, function(err, user) {
            if (err) { next(err); }
            else if (user) { res.redirect('/'); }
            else {
                const hash = bcrypt.hashSync(req.body.password, 12);
                myDataBase.insertOne ({
                    username: req.body.username,
                    password: hash
                }, function(err, doc) {
                        if (err) { return next(err); }
                        else { res.redirect('/'); }
                    }
                )
            }
        })
    },  passport.authenticate('local', { failureRedirect: '/signup.html'}),
            function(req, res, next) {
                res.redirect('/');
            }
    );
    
    router.post('/login/password', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login.html'
    }));
}); 

    // router.post('/login/password', passport.authenticate('local', {
    //     successRedirect: '/',
    //     failureRedirect: '/login.html'
    // }));
    
    // passport.serializeUser((user, cb) => {
//     process.nextTick( () => {
//         cb(null, { id: user.id, username: user.username });
//     });
// });

// passport.deserializeUser( (user, cb) => {
//     process.nextTick( () => {
//         return cb(null, user);
//     });
// });
})

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//     db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
//         if (err) { return cb(err); }
//         if (!row) { return cb(null, false, { message: 'Incorrect username or password.'}); }

//         crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//             if (err) { return cb(err); }
//             if (!crypto.timingSafeEqual(row.hashedPassword, hashedPassword)) {
//                 return cb(null, false, { message: 'Incorrect username or password'});
//             }

//             return cb(null, row);
//         });
//     });
// }));

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//     db.prepare('SELECT * FROM users WHERE username = ?').get([username]), (err, row) => {
//         if (err) { return cb(err); }
//         if (!row) { return cb(null, false, { message: 'Incorrect username or password.'}); }
        
//         crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
//             if (err) { return cb(err); }
//             if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//                 return cb(null, false, { message: 'Incorrect username or password.'});
//             }

//             return cb(null, row);
//         });
//     };
// }));
    // }));

    //     crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', (err, hashedPassword {
    //         if (err) { return cb(err); }
    //         if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
    //             return cb(null, false, {message: 'Incorrect username or password.'});
    //         });
    //     });
    // }));

// passport.serializeUser((user, cb) => {
//     process.nextTick( () => {
//         cb(null, { id: user.id, username: user.username });
//     });
// });

// passport.deserializeUser( (user, cb) => {
//     process.nextTick( () => {
//         return cb(null, user);
//     });
// });


// router.post('/login/password', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login.html'
// }));
// router.get('/signup.html', (req, res) => {
//     console.log('on login page');
//     // res.sendFile('/signup.html');
//     // res.send('on sign up page');
//     // console.log('on sign up page');
//     // res.sendFile('./signup.html');
// });

// router.get('/test', (req, res) => {
//     console.log('test log');
//     res.send('on test page');
// })

module.exports = router;