import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// =====================
// Middleware
// =====================
app.use(
  cors({
    origin: "*", // allow requests from anywhere (frontend later)
  })
);

app.use(express.json()); // parse JSON bodies
app.use(rateLimiter);

// =====================
// Routes
// =====================
app.use("/api/notes", notesRoutes);

// Health check (optional but helpful)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// =====================
// Start Server
// =====================
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
