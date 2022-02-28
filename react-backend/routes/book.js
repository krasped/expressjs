var express = require("express");
var router = express.Router();
const db = require("../db/models");
const { Op } = require("sequelize");


const createBook = function (req, res) {
    db.Book
        .create({
            code: req.body.code,
            bookTitleId: req.body.booksTitleId,
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
};

const getBook = function (req, res) {
    db.Book
        .findAll({ raw: true })
        .then((book) => {
            res.json(book);
        })
        .catch((err) => console.log(err));
}

const getAuthor = function (req, res) {
    db.Book.findAll({
        raw: true,
        where: { BookTitleId: { [Op.ne]: null } },
    })
    .then((author) => {
        let bookTitleId = [];
        author.forEach((book) =>
            bookTitleId.push({
                bookId: book.id,
                bookTitleId: book.bookTitleId,
            }),
        );
        return bookTitleId; 
    })
    .then((bookTitleId) => {
        return db.AuthorBookTitle.findAll({ raw: true })
        .then((author) => {
            let book_author = [];
            bookTitleId.forEach((book) => {
                let authorId = [];
                author.forEach((authorBook) => {
                    if (book.bookTitleId === authorBook.bookTitleId) {
                        authorId.push(authorBook.authorId);
                    }
                });
                if (authorId.length) {
                    book_author.push({
                        bookId: book.bookId,
                        authorId: authorId,
                    });
                }
            });
            return book_author;
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
        res.json(result);
    })
    .catch((err) => console.log(err));
};

const deleteBook = function (req, res) {
    db.Book
        .destroy({
            where: {
                id: req.body.bookId
            }
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
}

const changeBook = function (req, res) {
    db.Book
        .update({
            code: req.body.code,
            bookTitleId: req.body.titleId,
        }, {
            where: {
                id: req.body.bookId
            }
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
}

router.get("/", getBook);
router.get("/author", getAuthor);
router.post("/", createBook);
router.post("/delete", deleteBook);
router.post("/change", changeBook);

module.exports = router;
