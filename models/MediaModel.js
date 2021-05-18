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
    allowNull: true,
  },
  imageSecure: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  blurhash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url_regular: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url_thumb: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  artist_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  portfolio_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  private: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Media;
