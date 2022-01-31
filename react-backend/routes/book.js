var express = require("express");
var router = express.Router();
const db = require("../db/");

const createBook = function (req, res) {
    db.bookModel
        .create({
            code: req.body.code,
            booksTitleId: req.body.booksTitleId,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
};

const getBook = function (req, res) {
    db.bookModel
        .findAll({ raw: true })
        .then((book) => {
            res.json(book);
        })
        .catch((err) => console.log(err));
};

router.get("/", getBook);
router.post("/", createBook);

module.exports = router;
