const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: process.env.NAME_DB,
});

dbConnection.connect(() => {
  console.log("DB is connected");
});

module.exports = dbConnection;
