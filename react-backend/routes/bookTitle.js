var express = require("express");
var router = express.Router();
const db = require("../db/models");
const { Op } = require("sequelize");

const createBookTitle = function (req, res) {
    db.BookTitle
        .create({
            title: req.body.title,
            description: req.body.description,
            // authorId: req.body.authorId
        })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => console.log(err));
};

const getBookTitle = function (req, res) {
    db.BookTitle
        .findAll({ raw: true })
        .then((books) => {
            res.json(books);
        })
        .catch((err) => console.log(err));
};

const getAuthor = function (req, res) {
    db.AuthorBookTitle.findAll({ raw: true })
    .then((result) => {
        return res.json(result);
    })
    .catch((err) => console.log(err));
};

const getBookTitleId = function (req, res) {
    db.BookTitle
    .findAll({ 
        raw: true,
        attributes: ['id']
    })
    .then((id) => {
        res.json(id);
    })
    .catch((err) => console.log(err));
}

const deleteBookTitle = function (req, res) {
    db.BookTitle
        .destroy({
            where: {
                id: req.body.bookTitleId
            }
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
}

const changeBookTitle = function (req, res) {
    db.BookTitle
        .update({
            title: req.body.title,
            description: req.body.description,
        }, {
            where: {
                id: req.body.bookTitleId
            }
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
}

router.post("/", createBookTitle);
router.get("/", getBookTitle);
router.get("/author", getAuthor);
router.get("/id", getBookTitleId);
router.post("/delete", deleteBookTitle);
router.post("/change", changeBookTitle);


module.exports = router;
