require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");
const controllers = require("./controllers");
const middlewares = require("./middleware");

app.use(middlewares.CORS);
app.use(Express.json());


app.use("/media", controllers.Media);
app.use("/user", controllers.User);
app.use('/comments', controllers.Comments);
// app.use('/admin', controllers.Admin)

dbConnection
  .authenticate()
  .then(() => dbConnection.sync(
    {alter: true}
    //{force: true}
    ))
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed due to ${err}`);
  });
