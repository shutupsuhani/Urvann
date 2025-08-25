const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const plantRoutes = require("./routes/plantRoutes");

const app = express();

// Middleware
app.use(cors());

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://urvann-inky.vercel.app/",
      "http://localhost:5173",
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error("Not allowed by CORS")); // Deny request
    }
  },
  credentials: true, // Allow cookies to be sent
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods

}));

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
