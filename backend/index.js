const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const plantRoutes = require("./routes/plantRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/plants", plantRoutes);

app.get("/", (req, res) => {
  res.send("🌱 Urvann backend is running successfully 🚀");
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(" MongoDB error:", err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
