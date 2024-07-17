const db = require("../models/db");

exports.getUser = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, username FROM users WHERE id = ?",
      [req.userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
