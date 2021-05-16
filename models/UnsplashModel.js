const db = require("../db");
const { DataTypes } = require("sequelize");

const UnsplashMedia = db.define("unsplashMedia", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  blurhash: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = UnsplashMedia;
