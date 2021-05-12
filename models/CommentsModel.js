const db = require("../db");
const { DataTypes } = require("sequelize");

const Comments = db.define("comments", {
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  private: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Comments;
