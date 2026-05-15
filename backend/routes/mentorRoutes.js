import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* =========================================================
   GET STUDENTS ASSIGNED TO A MENTOR
   URL: /api/mentor/students/:mentorEmail
========================================================= */
router.get("/students/:mentorEmail", async (req, res) => {
  try {
    const mentorEmail = req.params.mentorEmail;

    // 🔥 CRITICAL QUERY (THIS WAS WRONG / MISSING)
    const students = await User.find({
      role: "student",
      mentorEmail: mentorEmail,
    }).select("name email rollNo branch semester mentorName mentorEmail");

    res.json(students);
  } catch (err) {
    console.error("Mentor students fetch failed:", err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

export default router;