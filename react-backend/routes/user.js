var express = require("express");
var router = express.Router();
const db = require("../db/models");

const getUser = function (req, res) {
    db.User
        .findAll({ raw: true })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => console.log(err));
};

router.get("/", getUser);

module.exports = router;
