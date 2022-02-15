//создать запрос на соединение проверяет есть ли введеный пользователь, если таокй есть то создается токен и возвращается анзад пользователь, если нет то нет
var express = require("express");
var router = express.Router();
const db = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const bcryptPassword = (pass) => {
    const salt = 10;
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(salt));
}

const comparePassword = (pass, hashedPassword) => {
    return bcrypt.compareSync(pass, hashedPassword);
}

const getToken = function (req, res) {
    const login = req.body.login;
    const password = req.body.password;
    db.User
        .findAll({ raw: true })
        .then((user) => {
            let coonect = '';
            for(let i = 0; i < user.length; i++){
                if (user[i].id == login && comparePassword(password, user[i].password)){
                    coonect = jwt.sign({
                        data: user[i].id
                      }, 'secret');
                    break;
                }
            }
            res.json(coonect);
        })
        .catch((err) => console.log(err));
};

const registrateUser = function (req, res) {
    db.User
        .create({
            firstName: req.body.first,
            lastName: req.body.last,
            email: req.body.email,
            password: bcryptPassword(req.body.password)
        })
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => console.log(err));
};

router.post("/registration", registrateUser);
router.post("/", getToken);

module.exports = router;
