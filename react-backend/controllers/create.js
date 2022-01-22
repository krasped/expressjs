const db = require("../db/")

let create ={};
create.user = function(req, res) {
    db.userModel.create({
    first_name: req.body.first,
    last_name: req.body.last
    }).then(res=>{
    console.log(res);
    }).catch(err=>console.log(err));
};

create.book = function(req, res) {
    db.bookModel.create({
    title: req.body.title,
    description: req.body.description
    }).then(res=>{
    console.log(res);
    }).catch(err=>console.log(err));
};

module.exports = create;