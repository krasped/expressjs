const Sequelize = require('sequelize');

module.exports = function (sequelize){
    return sequelize.define("books", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        code:{
            type: Sequelize.STRING,
            allowNull: false
        },
        booksTitleId:{
            type: Sequelize.INTEGER,
            autoIncrement: false,
            allowNull: true
        }
    },{timestamps: false});
}