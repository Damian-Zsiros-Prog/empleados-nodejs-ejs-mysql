const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
// Iniciando express
const app = express();
// Settings
app.set("port", process.env.PORT || 4000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Middelwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
// Public Files
app.use(express.static(__dirname + "/public"));
// Routes
app.use(require("./routes/empleados.routes"));
// Iniciando el server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
