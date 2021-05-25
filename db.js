const Sequelize = require("sequelize").Sequelize;

let sequelize = new Sequelize(process.env.DB_CONN_URL, {
  dialect: "postgres",
  ssl: process.env.ENVIRONMENT === "production",
});

module.exports = sequelize;
