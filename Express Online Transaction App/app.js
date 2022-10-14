const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("dotenv").config();
const app = express();
const deal = require("./app/controller/deal.js");
const dbFile = "./app/db/users.json";
const staticFiles = path.join(__dirname, "./frontend/public");
const viewsFiles = path.join(__dirname, "frontend/views");
const layoutsFiles = path.join(__dirname, "frontend/layouts");
const PORT = process.env.PORT || 5000;
//encoder for post method
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticFiles));
app.set("view engine", "hbs");
app.set("views", viewsFiles);
hbs.registerPartials(layoutsFiles);

const userRoutes = require("./app/routes/user.routes");
app.use(userRoutes);
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
