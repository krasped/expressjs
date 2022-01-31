const Sequelize = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define(
        "users",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        { timestamps: false },
    );
};
