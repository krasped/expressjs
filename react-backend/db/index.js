const Sequelize = require('sequelize');

const sequelize = new Sequelize("usernametable", "root", "123456qQ", {
    dialect: "mysql",
    host: "localhost",
    port: 3307
});

const user = require('./model').user(sequelize);
const book = require('./model').book(sequelize);

module.exports = {
    "sequelize": sequelize,
    "userModel": user,
    "bookModel": book
}