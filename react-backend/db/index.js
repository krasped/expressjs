const Sequelize = require('sequelize');

const sequelize = new Sequelize("usernametable", "root", "123456qQ", {
    dialect: "mysql",
    host: "localhost",
    port: 3307
});

const user = require('./user')(sequelize);
const book = require('./book')(sequelize);
const bookTitle = require('./bookTitle')(sequelize);

bookTitle.hasMany(book);
sequelize.sync().then(result => {
    console.log("syncronyzation successful");
}).catch(err => console.log(err));

module.exports = {
    "sequelize": sequelize,
    "userModel": user,
    "bookModel": book,
    "bookTitleModel": bookTitle 
}