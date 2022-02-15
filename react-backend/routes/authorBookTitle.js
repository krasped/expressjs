var express = require("express");
var router = express.Router();
const db = require("../db/models");

const createAuthorBookTitle = function (req, res) {
    db.AuthorBookTitle
        .create({
            authorId: req.body.authorId,
            bookTitleId: req.body.bookTitleId,
        })
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => console.log(err));
};

const getAuthorBookTitle = function (req, res) {
    db.AuthorBookTitle.findAll({ raw: true })
    .then((result) => {
        console.log(result);
        return res.json(result);
    })
    .catch((err) => console.log(err));
};

router.get("/", getAuthorBookTitle);
router.post("/", createAuthorBookTitle);

module.exports = router;
