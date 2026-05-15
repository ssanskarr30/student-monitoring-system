import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* =========================================================
   GET MENTOR DETAILS FOR STUDENT
========================================================= */
router.get("/mentor/:email", async (req, res) => {
  try {
    const mentor = await User.findOne({
      email: req.params.email,
      role: "mentor",
    }).select("-password");

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch mentor" });
  }
});

export default router;