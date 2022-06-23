const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
let crypto = require('crypto');
const router = express.Router();

router.get('/signup.html', (req, res) => {
    console.log('on sign up page');
});

module.exports = router;