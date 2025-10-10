const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../db"); // ⬅️ tambahin ini supaya bisa query MySQL

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Auth API works 🚀" });
});

// Profile (get user by token)
router.get("/me", authMiddleware, (req, res) => {
  const sql = "SELECT id, username, email FROM users WHERE id = ?";
  db.query(sql, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(results[0]); // kirim data user tanpa password
  });
});

module.exports = router;
