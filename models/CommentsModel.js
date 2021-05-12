const db = require("../db");
const { DataTypes } = require("sequelize");

const Comments = db.define("comments", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  heading: {
    type: DataTypes.STRING,
    allowNull: true
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
