const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const db = require("./config/db");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Signup route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  // Check if username already exists
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      return res.status(400).send("Username already exists.");
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;

      // Insert user into database
      const insertUserQuery =
        "INSERT INTO users (username, password) VALUES (?, ?)";
      db.query(insertUserQuery, [username, hash], (err, result) => {
        if (err) throw err;
        res.status(201).send("User registered successfully.");
      });
    });
  });
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  // Check if user exists
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(400).send("Invalid username or password.");
    }

    const user = results[0];

    // Compare the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        res.status(200).send("Login successful.");
      } else {
        res.status(400).send("Invalid username or password.");
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
