const Sequelize = require('sequelize');

module.exports.book = function (sequelize){
    return sequelize.define("books", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },
        description:{
            type: Sequelize.TEXT,
            allowNull: false
        }
    },{timestamps: false});
}

module.exports.user = function (sequelize){
    return sequelize.define("users", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        first_name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name:{
            type: Sequelize.STRING,
            allowNull: false
        }
    },{timestamps: false});
}

