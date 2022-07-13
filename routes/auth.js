const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
// let crypto = require('crypto');
// let db = require('../db');
let User = require('../db');
const { response } = require('../app');
const ObjectID = require('mongodb').ObjectId;
const router = express.Router();

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser(() => { console.log('serialized'); }));
passport.deserializeUser(User.deserializeUser(() => { console.log('deserialized'); }));

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/profile.html',
    failureRedirect: '/login.html'
}), function(req, res, next) {
        console.log(req.isAuthenticated());
        res.redirect('/profile.html');
    }
);

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.post('/signup', function(req, res) {
    console.log(`attempting to register user: ${req.body.username}`);
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(`There was an error signing up: ${err}`);
            return res.redirect('/signup.html');
        }
        
        passport.authenticate('local') (req, res, function() {
            res.redirect('/profile.html');
        });
    });
});

router.post('/save', (req, res, done) => {
    const data = req.body;
    const base64 = data.base64;
    const localDate = new Date().toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric'});
    const id = ObjectID();
    // console.log(`request made by ${req.user.username}`);
    User.findOneAndUpdate({ username: req.user.username},
        { $push: { saved: {url: base64, date: localDate, _id: id} }},
        { new: true },
        (err, result) => {
            if (err) return console.log(err);
            res.json({
                status: 'success',
                b64: base64,
                date: localDate,
                oid: id
            });
            // done(null, result);
        });
});

router.post('/delete', (req, res, done) => {
    const data = req.body;
    User.findOneAndUpdate({ username: req.user.username},
        { $pull: { saved: { _id: {$in: data.selected}}}},
        { new: true },
        (err, result) => {
            if (err) return console.log(err);
            // res.redirect('/profile.html');
            res.json({
                status: 'success',
                user: result,
                redirect: '/profile.html'
            });
            // res.sendFile('/profile.html');
        });
    // res.json({
    //     status: 'success',
    //     user: req.user.username,
    //     selected: data.selected
    // });
});

router.post('/deleteAll', (req, res, done) => {
    const data = req.body;
    User.findOneAndUpdate({ username: req.user.username}, 
        { $set: { saved: [] }},
        { new: true},
        (err, result) => {
            if (err) return console.log(err);
            // res.redirect('/profile.html');
            res.json({
                status: 'success',
                user: result,
                redirect: '/profile.html'
            });
        });
});

router.post('/clouds', (req, res, done) => {
    const data = req.body;
    User.findOne({ username: req.user.username}, function (err, user) {
        if (err) return console.log(err);
        res.json({
            status: 'success',
            user: req.user
        });
    });
});

router.post('/user', (req, res, done) => {
    if (req.user === undefined) {
        res.json({});
    } else {
        res.json ({
            status: 'success',
            user: req.user
        });
    }
});""

router.post('/cotd', (req, res, done) => {
    User.find({},
        // { saved: 1}, // works, returns every document 
        // {saved : 1},
        { $size: { saved: { $not: 0}}},
        // {"saved.0" : {"$exists": true}},
        // { $exists: true, $not: { $size: 1 }},
        // { $elemMatch: { saved: { $exists: true, $not: { $size: 1}}}},
        // { saved: { "saved.0": { "$exists": true}}},
        // { "$match": { "saved.0": { "$exists": true }}},
        // { $match: { "saved.0": { $exists: true }}},
        // { saved: {$ne: null }},
        // { saved: { '$size': 0 }},
        // { saved: { $exists: true}}, // unknown expression exists
        // { $elemMatch: { saved: { $exists: true }}},
        // { saved:1, _id: 0 }, // cannot do exclusion on field hash in inclusino projection
        // { $match: { "saved.0": { $exists: true}}},
        // { saved: {$elemMatch: }}
        // { $match: { saved: {$elemMatch: { $exists:true }}}},
        // { saved: { $elemMatch: { $exists: true}}},
        // { saved: { $elemMatch: { $not: { $size: 0 }}}},
        // { saved: { $match: { $exists: true }}},
        // { saved: { $elemMatch: { $exists: true, $not: { $size: 0}}}},
        // { saved: { $exists: true, $ne: [] }},
        // { "saved.0": { $elemMatch: { $exists: true }}},
        // { $first: "$saved"},
        // { saved: { $not: { $size:0 }}},
        // { $elemMatch: { saved: { $not: { $size: 0 }}}}, // field path names may not start with $
        (err, result) => {
            if (err) return console.log(err);
            res.json({
                status: 'success',
                res: result
            });
        });
    // User.find( 
    //     {}, 
    //     { saved: 1 },
    //     (err, result) => {
    //         if (err) return console.log(err);
    //         done(result);
    //     }).toArray

    // User.findOneAndUpdate({ username: req.user.username}, 
    //     { $set: { saved: [] }},
    //     { new: true},
    //     (err, result) => {
    //         if (err) return console.log(err);
    //         // res.redirect('/profile.html');
    //         res.json({
    //             status: 'success',
    //             user: result,
    //             redirect: '/profile.html'
    //         });
    //     });
    // User.find( {},
    //     {saved:1},
    // ).toArray((err, result) => {
    //     if (err) return console.log(err);
    // })
});

router.use('/profile.html', ensureAuthenticated);

// router.get('/profile.html', ensureAuthenticated, function(req, res, next) {
//     // let saved = User.findOne({ username: req.user.username});
//     // console.log(typeof(saved));
//     let saved;
//     User.findOne({ username: req.user.username }, function (err, user) {
//         if (err) return console.log(err);
//         // saved = user.saved;
//         // console.log(user.saved[0]);
//         // console.log(typeof(user.saved));
//         user.saved.forEach((element) => {
            
//         });
//     });
//     // console.log(typeof(saved));
//     next();
// });

// app.post('/api', (request, response) => {
//     const data = request.body;
//     response.json({
//         status: 'success',
//         latitude: data.lat,
//         longitude: data.lon,
//         api: process.env.API_KEY
//     });
// });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('authenticated');
        return next();
    }
    console.log('not authenticated');
    res.redirect('/login.html');
};



// db(async client => {
//     // const myDataBase = await client.db('database').collection('users');

//     function ensureAuthenticated(req, res, next) {
//         if (req.isAuthenticated()) {
//             console.log('authenticated');
//             return next();
//         }
//         console.log('not authenticated');
//         res.redirect('/login.html');
//     };

//     // router.get('/profile.html', ensureAuthenticated, function(req, res) {
//     //     // res.sendFile('/profile.html');
//     //     // res.render('/profile.html');
//     //     res.redirect('/profile.html');
//     // })
//     // router.get('/profile.html', function(req, res) {
//     //     res.send('test');
//     // })

//     router.post('/login/password', passport.authenticate('local', {
//         successRedirect: '/profile.html',
//         failureRedirect: '/login.html'
//     }), function(req, res, next) {
//             res.redirect('/profile.html');
//         }
//     );
//     passport.use(new LocalStrategy( function(username, password, cb) {
//         myDataBase.findOne( {username: username}, function(err, user) {
//             console.log(`User ${username} attempted to log in.`);
//             if (err) { return cb(err); }
//             if (!user) { return cb(null, false, { message: 'Incorrect username or password'}); }

//             if (!bcrypt.compareSync(password, user.password)) {
//                 return cb(null, false, { message: 'Incorrect username or password'});
//             }

//             return cb(null, user);
//         });
//     }));

//     passport.serializeUser( function(user, cb) {
//         cb(null, user._id);
//     })

//     passport.deserializeUser( function(id, cb) {
//         myDataBase.findOne({ _id: new ObjectID(id)}, function(err, user) {
//             cb(null, user);
//         });
//     });

    // router.post('/signup', function(req, res, next) {
    //     // console.log(`attempting signup ${req.body.username}`);
    //     myDataBase.findOne({ username: req.body.username}, function(err, user) {
    //         if (err) { next(err); }
    //         else if (user) { res.redirect('/profile.html'); }
    //         else {
    //             const hash = bcrypt.hashSync(req.body.password, 12);
    //             myDataBase.insertOne ({
    //                 username: req.body.username,
    //                 password: hash
    //             }, function(err, doc) {
    //                     if (err) { return next(err); }
    //                     else { res.redirect('/profile.html'); }
    //                 }
    //             )
    //         }
    //     })
    // },  passport.authenticate('local', { failureRedirect: '/signup.html'}),
    //         function(req, res, next) {
    //             res.redirect('/profile.html');
    //         }
    // );
    
//     router.post('/login/password', passport.authenticate('local', {
//         successRedirect: '/profile.html',
//         failureRedirect: '/login.html'
//     }), function(req, res, next) {
//             res.redirect('/profile.html');
//         }
//     );
    
//     router.post('/logout', function(req, res, next) {
//         req.logout(function(err) {
//             if (err) { return next(err); }
//             res.redirect('/');
//         });
//     });

//     // router.get('/profile.html', passport.authenticate('local', {
//     //     successRedirect: '/',
//     //     failureRedirect: '/login.html'
//     // }), function(req, res, next) {
//     //         console.log(req.body);
//     //     }
//     // );
//     // router.get('/profile.html', ensureAuthenticated, function(req, res) {
//     //     console.log(req.isAuthenticated);
//     //     res.render('/profile.html');
//     // });

//     // router.post('/save', function(req, res) {
//     //     console.log('attemped to save image');
//     //     // buttons are stacked because i added a form around one button
//     //     // tomorrow todo: 1) figure out how to use button to save image
//     //     // 2) by save image i mean convert img to base64, send to server to find user's account,
//     //     // 3) then have personal image gallery populates
//     // });
//     // router.post('/logout', function(req, res) {
//     //     req.logout();
//     //     res.redirect('/index.html');
//     // })
// }); 

//     // router.post('/login/password', passport.authenticate('local', {
//     //     successRedirect: '/',
//     //     failureRedirect: '/login.html'
//     // }));
    
//     // passport.serializeUser((user, cb) => {
// //     process.nextTick( () => {
// //         cb(null, { id: user.id, username: user.username });
// //     });
// // });

// // passport.deserializeUser( (user, cb) => {
// //     process.nextTick( () => {
// //         return cb(null, user);
// //     });
// // });

// // passport.use(new LocalStrategy(function verify(username, password, cb) {
// //     db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
// //         if (err) { return cb(err); }
// //         if (!row) { return cb(null, false, { message: 'Incorrect username or password.'}); }

// //         crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
// //             if (err) { return cb(err); }
// //             if (!crypto.timingSafeEqual(row.hashedPassword, hashedPassword)) {
// //                 return cb(null, false, { message: 'Incorrect username or password'});
// //             }

// //             return cb(null, row);
// //         });
// //     });
// // }));

// // passport.use(new LocalStrategy(function verify(username, password, cb) {
// //     db.prepare('SELECT * FROM users WHERE username = ?').get([username]), (err, row) => {
// //         if (err) { return cb(err); }
// //         if (!row) { return cb(null, false, { message: 'Incorrect username or password.'}); }
        
// //         crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
// //             if (err) { return cb(err); }
// //             if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
// //                 return cb(null, false, { message: 'Incorrect username or password.'});
// //             }

// //             return cb(null, row);
// //         });
// //     };
// // }));
//     // }));

//     //     crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', (err, hashedPassword {
//     //         if (err) { return cb(err); }
//     //         if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//     //             return cb(null, false, {message: 'Incorrect username or password.'});
//     //         });
//     //     });
//     // }));

// // passport.serializeUser((user, cb) => {
// //     process.nextTick( () => {
// //         cb(null, { id: user.id, username: user.username });
// //     });
// // });

// // passport.deserializeUser( (user, cb) => {
// //     process.nextTick( () => {
// //         return cb(null, user);
// //     });
// // });


// // router.post('/login/password', passport.authenticate('local', {
// //     successRedirect: '/',
// //     failureRedirect: '/login.html'
// // }));
// // router.get('/signup.html', (req, res) => {
// //     console.log('on login page');
// //     // res.sendFile('/signup.html');
// //     // res.send('on sign up page');
// //     // console.log('on sign up page');
// //     // res.sendFile('./signup.html');
// // });

// // router.get('/test', (req, res) => {
// //     console.log('test log');
// //     res.send('on test page');
// // })

module.exports = router;