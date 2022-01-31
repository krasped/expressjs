const Sequelize = require("sequelize");

const sequelize = new Sequelize("usernametable", "root", "123456qQ", {
    dialect: "mysql",
    host: "localhost",
    port: 3307,
});

const user = require("./user")(sequelize);
const book = require("./book")(sequelize);
const booksTitle = require("./booksTitle")(sequelize);

booksTitle.hasMany(book, { foreignKey: "booksTitleId" });

sequelize
    .sync()
    .then((result) => {
        console.log("syncronyzation successful");
    })
    .catch((err) => console.log(err));

module.exports = {
    sequelize: sequelize,
    userModel: user,
    bookModel: book,
    booksTitleModel: booksTitle,
};
