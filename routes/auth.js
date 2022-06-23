const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
let crypto = require('crypto');
const router = express.Router();

router.get('/index', (req, res, next) => {
    console.log('on signup page');
    next();
});

module.exports = router;