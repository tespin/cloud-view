const express = require('express');
const passport = require('passport');
let User = require('../../db');

printUser();

function printUser(req, res) {
    console.log(req.user.username);
}

