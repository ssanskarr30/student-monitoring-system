import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

/* ================= ROUTES ================= */
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import semesterRoutes from "./routes/semesterRoutes.js";
import hodAnalyticsRoutes from "./routes/hodAnalyticsRoutes.js";
import mentorNotesRoutes from "./routes/mentorNotesRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

/* ================= APP ================= */
const app = express();

app.use(cors());
app.use(express.json());

/* ================= API ROUTES ================= */

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/mentor", mentorRoutes);

app.use("/api/student", studentRoutes);

app.use("/api/meetings", meetingRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/semester", semesterRoutes);

app.use("/api/hod-analytics", hodAnalyticsRoutes);

app.use("/api/mentor-notes", mentorNotesRoutes);

app.use("/api/notifications", notificationRoutes);

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.send("API running ✅");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });

  } catch (err) {

    console.error(
      "❌ MongoDB connection failed:",
      err.message
    );

    process.exit(1);

  }
}

startServer();