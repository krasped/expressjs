'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookTitle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookTitle.hasOne(models.Book, {
        foreignKey: 'bookTitleId',
        as: 'Book'
      })
      BookTitle.belongsToMany(models.Author, {
        foreignKey: 'bookTitleId',
        through: 'AuthorBookTitle',
        as: 'Author'
      })
    }
  }
  BookTitle.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookTitle',
  });
  return BookTitle;
};