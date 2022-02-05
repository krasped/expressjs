var express = require("express");
var router = express.Router();
const db = require("../db/models");

const createUser = function (req, res) {
    db.User
        .create({
            firstName: req.body.first,
            lastName: req.body.last,
        })
        .then((res) => {
            console.log(res);
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

router.post("/", createUser);
router.get("/", getUser);

module.exports = router;
