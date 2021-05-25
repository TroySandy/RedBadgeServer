const Sequelize = require("sequelize").Sequelize;

let sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  ssl: process.env.ENVIRONMENT === "production",
});

module.exports = sequelize;
