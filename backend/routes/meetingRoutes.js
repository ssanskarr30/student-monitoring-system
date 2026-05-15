import express from "express";
import Meeting from "../models/Meeting.js";

const router = express.Router();

/* ================= CREATE MEETING ================= */
router.post("/", async (req, res) => {
  try {
    const {
      studentEmail,
      studentName,
      mentorEmail,
      mentorName,
      date,
      topic,
      notes,
    } = req.body;

    if (!studentEmail || !mentorEmail || !date || !topic) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const meeting = await Meeting.create({
      studentEmail,
      studentName,
      mentorEmail,
      mentorName,
      date,
      topic,
      notes, // optional
      status: "pending",
    });

    res.status(201).json(meeting);
  } catch (err) {
    console.error("Meeting create error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= MENTOR – GET MEETINGS ================= */
router.get("/mentor/:email", async (req, res) => {
  const { email } = req.params;
  const { status } = req.query;

  const filter = { mentorEmail: email };
  if (status) filter.status = status;

  const meetings = await Meeting.find(filter).sort({ createdAt: -1 });
  res.json(meetings);
});

/* ================= STUDENT – GET MEETINGS ================= */
router.get("/student/:email", async (req, res) => {
  const meetings = await Meeting.find({
    studentEmail: req.params.email,
  }).sort({ createdAt: -1 });

  res.json(meetings);
});

/* ================= APPROVE ================= */
router.put("/:id/approve", async (req, res) => {
  await Meeting.findByIdAndUpdate(req.params.id, {
    status: "approved",
    rejectionReason: null, // ✅ FIXED FIELD NAME
  });

  res.json({ message: "Approved" });
});

/* ================= REJECT ================= */
router.put("/:id/reject", async (req, res) => {
  const { reason } = req.body;

  await Meeting.findByIdAndUpdate(req.params.id, {
    status: "rejected",
    rejectionReason: reason || "No reason provided", // ✅ FIXED
  });

  res.json({ message: "Rejected" });
});

export default router;