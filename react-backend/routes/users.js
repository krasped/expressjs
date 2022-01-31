var express = require("express");
var router = express.Router();
const db = require("../db/");

const createBook = function (req, res) {//
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

const getBook = function (req, res) {//
    db.bookModel
        .findAll({ raw: true })
        .then((book) => {
            res.json(book);
        })
        .catch((err) => console.log(err));
};

const createUser = function (req, res) {
    db.userModel
        .create({
            firstName: req.body.first,
            lastName: req.body.last,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
};

const createBookTitle = function (req, res) {//
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

const getUser = function (req, res) {
    db.userModel
        .findAll({ raw: true })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => console.log(err));
};

const getBookTitle = function (req, res) {//
    db.booksTitleModel
        .findAll({ raw: true })
        .then((books) => {
            res.json(books);
        })
        .catch((err) => console.log(err));
};

router.post("/user", createUser);
router.get("/user", getUser);
router.post("/bookTitle", createBookTitle);//
router.get("/bookTitle", getBookTitle);//
router.get("/book", getBook);
router.post("/book", createBook);

module.exports = router;
