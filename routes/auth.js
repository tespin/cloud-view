const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
let crypto = require('crypto');
const router = express.Router();

router.get('/signup.html', (req, res) => {
    console.log('on login page');
    // res.sendFile('/signup.html');
    // res.send('on sign up page');
    // console.log('on sign up page');
    // res.sendFile('./signup.html');
});

router.get('/test', (req, res) => {
    console.log('test log');
    res.send('on test page');
})

module.exports = router;