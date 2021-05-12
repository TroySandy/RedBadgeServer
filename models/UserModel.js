const db = require("../db");
const { DataTypes } = require("sequelize");

const User = db.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   isAlpha: true,
    // }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   isAlpha: true,
    // }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    isUnique: true,
    // validate: {
    //   isAlphanumeric: true,
    //   len: [2,10]
    // }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    isUnique: true,
    // validate: {
    //   isEmail: true
    // }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   isAlphanumeric: true,
    //   len: [2,20],
    // }
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  
});

module.exports = User;
