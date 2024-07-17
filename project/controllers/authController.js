const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await db.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
