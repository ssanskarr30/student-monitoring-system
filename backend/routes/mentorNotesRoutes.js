import express from "express";

import MentorNote from "../models/MentorNote.js";

const router = express.Router();

/* =========================================
   CREATE NOTE
========================================= */
router.post("/", async (req, res) => {
  try {
    const note = await MentorNote.create(req.body);

    res.json(note);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create note",
    });
  }
});

/* =========================================
   GET STUDENT NOTES
========================================= */
router.get("/:studentId", async (req, res) => {
  try {
    const notes = await MentorNote.find({
      studentId: req.params.studentId,
    }).sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch notes",
    });
  }
});

export default router;