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

router.post('/login/password', passport.authenticate('local', {failWithError: true, failureMessage: true}),
    function(req, res, next) {
        // handle success
        // req.session.messages = [];
        res.redirect('/home.html');
        // res.json({
        //     status: 'SUCCESS',
        //     redirect:'/home.html'
        // });
    }, 
    function(err, req, res, next) {
        // handle error
        const messages = req.session.messages;
        const msg = messages.slice(-1);
        if (err) {
            console.log(err);
            console.log(messages)
            console.log(msg);
            res.json({
                status: 'FAILED',
                error: err,
                message: messages
            });
        }
    }

)

// router.post('/login/password', passport.authenticate('local', {
//     // successRedirect: '/home.html',
//     failureRedirect: '/login.html',
//     failureMessage: true,
// }), function (req, res) {
//     res.redirect('/home.html');
//     // console.log(req.session.messages);
// });

// router.post('/login/password', passport.authenticate('local', {
//     successRedirect: '/home.html',
//     failureRedirect: '/login.html'
// }), function(req, res, next) {
//         res.redirect('/home.html');
//     }
// );

// router.post('/login/password', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//         if (err) return next(new Error(err.message));
//         if (!user) return next(new Error(err.message));
//     }), function(req, res, next) {
//         res.redirect('home.html');
//     }
// })

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.post('/signup', function(req, res, done) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(`There was an error signing up: ${err}`);
            res.json({
                status: 'FAILED',
                error: err.message,
                message: req.session.messages
            });
            // return done(new Error(err.message));
            // res.send(err.message);
            // return done(null, false, { message: err.message});
            // return res.redirect('/signup.html');
        }
        
        passport.authenticate('local') (req, res, function() {
            res.redirect('/home.html');
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
                status: 'OK',
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
                status: 'OK',
                user: req.user
                // redirect: '/profile.html'
            });
        });
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

router.post('/signupLoginErrors', (req, res, done) => {
    const messages = req.session.messages;
    if (!messages || messages.length == 0) {
        res.json({
            status: 'FAILED'
        });
    } else {
        const msg = messages.slice(-1);
        res.json({
            status: 'SUCCESS',
            message: msg
        });
    }
})

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
    User.find({"saved.0": { "$exists": true }},
        
        //{ saved: 1}, // works, returns every document 
        // {saved: { $size: 1}},
        // {"req.user.saved": 1},
        // { $size: { saved: { $not: 0}}},
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
});

router.use('/home.html', ensureAuthenticated);
router.use('/storage.html', ensureAuthenticated);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('authenticated');
        return next();
    }
    console.log('not authenticated');
    res.redirect('/login.html');
};

module.exports = router;