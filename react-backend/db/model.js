const Sequelize = require('sequelize');

module.exports = function (sequelize){
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