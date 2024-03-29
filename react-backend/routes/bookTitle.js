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
            console.log(result);
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
        //добавить получение авторов если они есть
};

const getAuthor = function (req, res) {
    db.AuthorBookTitle.findAll({ raw: true })
    .then((result) => {
        console.log(result);
        return res.json(result);
    })
    .catch((err) => console.log(err));
};

router.post("/", createBookTitle);
router.get("/", getBookTitle);
router.get("/author", getAuthor);

module.exports = router;
