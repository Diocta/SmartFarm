require("dotenv").config(); // panggil dotenv di paling atas

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Route test koneksi
app.get("/api/test", (req, res) => {
  res.json({ message: "API Connected 🚀" });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
