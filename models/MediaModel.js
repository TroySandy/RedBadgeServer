const db = require("../db");
const { DataTypes } = require("sequelize");

const Media = db.define("media", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageSecure: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },

  private: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Media;
