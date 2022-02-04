'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthorBookTitle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AuthorBookTitle.belongsTo(models.Author, { 
        foreignKey: 'authorId', 
        as: 'Author' 
      });
      AuthorBookTitle.belongsTo(models.BookTitle, { 
        foreignKey: 'bookTitleId', 
        as: 'BookTitle' 
      });
    }
  }
  AuthorBookTitle.init({
    authorId: DataTypes.INTEGER,
    bookTitleID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AuthorBookTitle',
  });
  return AuthorBookTitle;
};