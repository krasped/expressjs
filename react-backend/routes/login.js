//создать запрос на соединение проверяет есть ли введеный пользователь, если таокй есть то создается токен и возвращается анзад пользователь, если нет то нет
var express = require("express");
var router = express.Router();
const db = require("../db/models");
const jwt = require("jsonwebtoken")

const getToken = function (req, res) {
    const login = req.body.login;
    const password = req.body.password;
    db.User
        .findAll({ raw: true })
        .then((user) => {
            let coonect = null;
            for(let i = 0; i < user.length; i++){
                if (user[i].id == login && user[i].password === password){
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

const checkToken = function (req, res) {
    const token = req.body.token;
    var decoded = jwt.verify(token, 'secret');
    decoded.data;
    db.User
        .findAll({ raw: true })
        .then((user) => {
            let coonect = null;
            for(let i = 0; i < user.length; i++){
                if (user[i].id == decoded.data){
                    console.log('доступ разрешен')
                    break;
                }
            }
            res.json("ok");
        })
        .catch((err) => console.log(err));
};

router.get("/", checkToken);
router.post("/", getToken);

module.exports = router;
