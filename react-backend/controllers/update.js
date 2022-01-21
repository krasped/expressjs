const db = require("../db/")

let update = function(req, res) {
        db.model.findAll({raw:true}).then(users=>{
            res.json(users);
            }).catch(err=>console.log(err));
};

module.exports = update;