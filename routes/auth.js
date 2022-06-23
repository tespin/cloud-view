const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
let crypto = require('crypto');
const router = express.Router();

router.get('/index.html', (req, res, next) => {
    console.log('on home page');
    next();
});

module.exports = router;