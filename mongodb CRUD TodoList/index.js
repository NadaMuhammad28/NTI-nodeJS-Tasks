require("dotenv").config();
const connect = require("./app/db/connect");
const app = require("./app/server");
const { PORT } = process.env || 5000;

app.listen(PORT, console.log(`http://localhost:${PORT}`));
