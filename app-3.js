const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const db = require("./config/db");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Signup route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  try {
    // Check if username already exists
    const adminData

    if (rows.length > 0) {
      return res.status(400).send("Username already exists.");
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Insert user into database
    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hash,
    ]);

    res.status(201).send("User registered successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  try {
    // Check if user exists
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(400).send("Invalid username or password.");
    }

    const user = rows[0];

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(200).send("Login successful.");
    } else {
      res.status(400).send("Invalid username or password.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
