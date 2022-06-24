const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
let crypto = require('crypto');
let db = require('../db');
const router = express.Router();

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


router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login.html'
}));
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