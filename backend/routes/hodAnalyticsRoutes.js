import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* =========================================
   HOD ANALYTICS
========================================= */
router.get("/overview", async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalMentors = await User.countDocuments({
      role: "mentor",
    });

    const warningStudents = await User.countDocuments({
      role: "student",
      academicStatus: "warning",
    });

    const criticalStudents = await User.countDocuments({
      role: "student",
      academicStatus: "critical",
    });

    const lowCgpaStudents = await User.find({
      role: "student",
      cgpa: { $lt: 6 },
    }).select(
      "name email rollNo cgpa backlogCount academicStatus"
    );

    const delayedStudents = await User.find({
      role: "student",
      yearsCompleted: { $gt: 4 },
    }).select(
      "name email rollNo yearsCompleted cgpa"
    );

    const mentorLoads = await User.aggregate([
      {
        $match: {
          role: "student",
          mentorEmail: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$mentorEmail",
          totalStudents: { $sum: 1 },
        },
      },
    ]);

    res.json({
      totalStudents,
      totalMentors,
      warningStudents,
      criticalStudents,
      lowCgpaStudents,
      delayedStudents,
      mentorLoads,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load analytics",
    });
  }
});

export default router;