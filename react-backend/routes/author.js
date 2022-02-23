var express = require("express");
var router = express.Router();
const db = require("../db/models");

const createAuthor = function (req, res) {
    db.Author
        .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => console.log(err));
};

const getAuthor = function (req, res) {
    db.Author
        .findAll({ raw: true })
        .then((author) => {
            res.json(author);
        })
        .catch((err) => console.log(err));
};

const getAuthorId = function (req, res) {
    db.Author
        .findAll({ 
            raw: true,
            attributes: ['id']
        })
        .then((author) => {
            res.json(author);
        })
        .catch((err) => console.log(err));
};

const deleteAuthor = function(req, res) {
    db.Author
        .destroy({
            where: {
                id: req.body.authorId
            }
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
}

const changeAuthor = function(req, res) {
    db.Author
        .update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }, {
            where: {
                id: req.body.authorId
            }
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
}

router.get("/", getAuthor);
router.get("/id", getAuthorId);
router.post("/", createAuthor);
router.post("/delete", deleteAuthor);
router.post("/change", changeAuthor);

module.exports = router;
