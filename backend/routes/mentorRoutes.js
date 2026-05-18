import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* =========================================
   GET STUDENTS + PHD SCHOLARS
========================================= */
router.get(
  "/students/:mentorEmail",
  async (req, res) => {

    try {

      const mentorEmail =
        req.params.mentorEmail;

      const students =
        await User.find({
          role: "student",

          $or: [
            {
              mentorEmail:
                mentorEmail,
            },

            {
              supervisorEmail:
                mentorEmail,
            },
          ],
        }).select(
          `
          name
          email
          rollNo
          branch
          semester
          mentorName
          mentorEmail
          studentType
          researchArea
          researchTopic
          supervisorName
          `
        );

      res.json(students);

    } catch (err) {

      console.error(
        "Mentor students fetch failed:",
        err
      );

      res.status(500).json({
        message:
          "Failed to fetch students",
      });

    }

  }
);

export default router;