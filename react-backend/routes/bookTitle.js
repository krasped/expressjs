var express = require("express");
var router = express.Router();
const db = require("../db/");

const createBookTitle = function (req, res) {
    db.booksTitleModel
        .create({
            title: req.body.title,
            description: req.body.description,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
};

const getBookTitle = function (req, res) {
    db.booksTitleModel
        .findAll({ raw: true })
        .then((books) => {
            res.json(books);
        })
        .catch((err) => console.log(err));
};

router.post("/", createBookTitle);
router.get("/", getBookTitle);

module.exports = router;
