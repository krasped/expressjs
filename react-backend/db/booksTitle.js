const Sequelize = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define(
        "book_titles",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        },
        { timestamps: false },
    );
};
