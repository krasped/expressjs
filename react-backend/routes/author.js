var express = require("express");
var router = express.Router();
const db = require("../db/models");
const passport = require('passport');

const createAuthor = function (req, res) {
    db.Author
        .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
};

const getAuthor = function (req, res) {
    db.Author
        .findAll({ raw: true })
        .then((author) => {
            res.json(author);
        })
        .catch((err) => console.log(err));
};

router.get("/", passport.authenticate('bearer', { session: false }), getAuthor);
router.post("/", createAuthor);

module.exports = router;
