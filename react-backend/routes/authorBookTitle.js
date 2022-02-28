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
            res.json(data);
        })
        .catch((err) => console.log(err));
};

const getAuthorBookTitle = function (req, res) {
    db.AuthorBookTitle.findAll({ raw: true })
    .then((result) => {
        return res.json(result);
    })
    .catch((err) => console.log(err));
};

const changeAuthorBookTitle = function (req, res) {
    db.AuthorBookTitle
        .update({
            authorId: req.body.authorId,
            bookTitleId: req.body.bookTitleId,
        }, {
            where: {
                bookTitleId: req.body.bookTitleId,
                authorId: req.body.prevAuthorId
            }
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
}

const deleteAuthorBookTitle = function (req, res) {
    db.AuthorBookTitle
        .destroy({
            where: {
                authorId: req.body.prevAuthorId,
                bookTitleId: req.body.bookTitleId
            }
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
}

router.get("/", getAuthorBookTitle);
router.post("/", createAuthorBookTitle);
router.post("/change", changeAuthorBookTitle);
router.post("/delete", deleteAuthorBookTitle);

module.exports = router;
