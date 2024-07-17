const mysql = require("mysql");

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testDB",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
  db.query("CREATE DATABASE IF NOT EXISTS testDB;", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  db.query(
    "CREATE TABLE IF NOT EXISTS users(username VARCHAR(255), password VARCHAR(255))",
    (err, result) => {
      if (err) throw err;
      console.log("Table created successfully");
    }
  );
});

module.exports = db;
