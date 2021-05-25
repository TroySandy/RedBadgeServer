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
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  blur_hash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url_thumb: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url_small: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url_reg: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url_raw: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  artist_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  artist_img: {
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
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Media;
