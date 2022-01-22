const db = require("../db/")

let update = {};
update.user = function(req, res) {
        db.userModel.findAll({raw:true}).then(users=>{
            res.json(users);
            }).catch(err=>console.log(err));
};

update.book = function(req, res) {
    db.bookModel.findAll({raw:true}).then(books=>{
        res.json(books);
        }).catch(err=>console.log(err));
};

module.exports = update;