const Sequelize = require('sequelize');

const sequelize = new Sequelize("usernametable", "root", "123456qQ", {
    dialect: "mysql",
    host: "localhost",
    port: 3307
});

const model = require('./model')(sequelize);

module.exports = {
    "sequelize": sequelize,
    "model": model
}