const db = require("../db");
const { DataTypes } = require("sequelize");

const Media = db.define("media", {
  file: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  private: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Media;
