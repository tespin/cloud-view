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

router.post('/login/password', passport.authenticate('local', { failWithError: true, failureMessage: true}),
    function(req, res, next) {
        res.redirect('/home.html');
    },
    function (err, req, res, next) {
        const messages = req.session.messages;
        const msg = messages.splice(-1)[0];
        res.json({
            status: 'FAILED',
            error: msg
        });
    }
)

// router.post('/login/password', passport.authenticate('local', {failWithError: true, failureMessage: true}),
//     function(req, res, next) {
//         // handle success
//         // req.session.messages = [];
//         // res.json({
//         //     status: 'SUCCESS',
//         //     redirect:'/home.html'
//         // });
//     }, 
//     function(err, req, res, next) {
//         // handle error
//         const messages = req.session.messages;
//         const msg = messages.slice(-1);
//         // console.log(typeof(msg));
//         // console.log(typeof(messages));
//         // console.log(messages);
//         if (err) {
//             // console.log(req.flash('info', msg));
//             res.redirect('/login.html');
//             // console.log(err);
//             // console.log(messages)
//             // console.log(msg);
//             // res.json({
//             //     status: 'FAILED',
//             //     error: err,
//             //     message: msg
//             // });
//         }
//     }

// )

// router.post('/login/password', passport.authenticate('local', {
//     successRedirect: '/home.html',
//     failureRedirect: '/login.html',
//     failureMessage: true,
// }), function (req, res) {
//     // res.redirect('/home.html');
//     // console.log(req.session.messages);
// });

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.post('/signup', function(req, res, done) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            // res.redirect('/signup.html')
            res.json({
                status: 'FAILED',
                error: err.message,
            });
        }
        
        passport.authenticate('local') (req, res, function() {
            res.redirect('/home.html');
        })

        // passport.authenticate('local') (req, res, function() {
        //     res.redirect('/home.html');
        // }), (req, res, err) => {
        //     return console.log(req.session.messages);
        //     // console.log(err);
        // };
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
    const type = typeof messages;
    if (!messages || messages.length == 0) {
        res.json({
            status: 'SUCCESS',
            message: 'No errors'
        });
    } else {
        const msg = messages.slice(-1)[0];
        res.json({
            status: 'FAILED',
            message: msg,
            datatype: type,
            session: req.session.messages
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