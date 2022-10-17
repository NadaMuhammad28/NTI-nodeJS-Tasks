const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
//post method
app.use(express.urlencoded({ extended: true }));
//hbs
app.set("view engine", "hbs");
//views
app.set("views", path.join(__dirname, "../frontend/views"));
//layouts
hbs.registerPartials(path.join(__dirname, "../frontend/layouts"));
app.use(express.static(path.join(__dirname, "../frontend/public")));
const userRoutes = require("./routes/user.routes");
app.use(userRoutes);
//route to err
app.all("*", (req, res) =>
  res.render("err404", { pageTitle: "page not found" })
);
module.exports = app;
