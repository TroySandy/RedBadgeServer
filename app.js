require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");
const controllers = require("./controllers");
const middlewares = require("./middleware");

app.listen(process.env.PORT, () => {
    console.log(`[Server]: App is listening on ${process.env.PORT}.`);
  });