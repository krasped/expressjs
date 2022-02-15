var express = require("express");
var router = express.Router();
const db = require("../db/models");
const passport = require('passport');

// var Strategy = require('passport-http-bearer').Strategy;

// const initializePassport = require('../passport-config');
// initializePassport(passport);

const registrateUser = function (req, res) {
    db.User
        .create({
            firstName: req.body.first,
            lastName: req.body.last,
            email: req.body.email,
            password: req.body.password
        })
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => console.log(err));
};

const getUser = function (req, res) {
    db.User
        .findAll({ raw: true })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => console.log(err));
};

router.post("/", registrateUser);
router.get("/", getUser);

module.exports = router;
