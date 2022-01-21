const db = require("../db/")

let create = function(req, res) {
        db.model.create({
        first_name: req.body.first,
        last_name: req.body.last
        }).then(res=>{
        console.log(res);
        }).catch(err=>console.log(err));

        db.model.findAll({raw:true}).then(users=>{
            res.json(users);
            }).catch(err=>console.log(err));
};

module.exports = create;