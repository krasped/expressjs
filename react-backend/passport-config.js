const BearerStrategy = require('passport-http-bearer').Strategy;
const db = require('./db/models');
const jwt = require("jsonwebtoken");

const findById = function(token, cb) {
    var decoded = jwt.verify(token, 'secret');
    process.nextTick(function() {
        db.User
        .findAll({ raw: true })
        .then((user) => {
            for(let i = 0; i < user.length; i++){
                if (user[i].id == decoded.data){
                    return cb(null, user[i]);  
                }
            }
            return cb(null, null);
            // res.json("ok");
        })
        .catch((err) => console.log(err));
    });
  }

exports.initializePassport = (passport) => {
    passport.use(new BearerStrategy(
        function(token, cb) {
          findById(token, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            return cb(null, user);
          });
        }));
}