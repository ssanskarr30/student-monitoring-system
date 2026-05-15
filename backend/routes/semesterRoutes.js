import express from "express";

import SemesterResult from "../models/SemesterResult.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

import {
  calculateAcademicStatus,
} from "../utils/academicWarningEngine.js";

const router = express.Router();

/* =========================================
   RECALCULATE TOTAL STUDENT ACADEMICS
========================================= */
const recalculateStudentAcademicData = async (
  studentId,
  cgpa,
  semester
) => {

  const allResults =
    await SemesterResult.find({
      studentId,
    });

  let totalCredits = 0;

  let totalBacklogs = 0;

  allResults.forEach((r) => {

    totalCredits +=
      Number(r.totalCredits || 0);

    totalBacklogs +=
      Number(r.backlogCount || 0);

  });

  const student =
    await User.findById(studentId);

  const {
    academicStatus,
    yearsCompleted,
  } = calculateAcademicStatus(
    student,
    Number(cgpa),
    totalBacklogs
  );

  await User.findByIdAndUpdate(
    studentId,
    {
      cgpa: Number(cgpa),

      completedCredits:
        totalCredits,

      backlogCount:
        totalBacklogs,

      academicStatus,

      yearsCompleted,

      semester:
        Number(semester),

      totalCreditsRequired: 163,
    }
  );

  return {
    academicStatus,
    totalCredits,
    totalBacklogs,
  };

};

/* =========================================
   SUBMIT OR UPDATE SEMESTER RESULT
========================================= */
router.post("/submit", async (req, res) => {

  try {

    const {
      studentId,
      studentEmail,
      studentName,
      mentorEmail,
      mentorName,
      semester,
      subjects,
      sgpa,
      cgpa,
    } = req.body;

    /* =========================================
       VALIDATION
    ========================================= */
    if (
      !studentId ||
      !studentEmail ||
      !semester ||
      !subjects ||
      !subjects.length
    ) {

      return res.status(400).json({
        message:
          "Missing required semester fields",
      });

    }

    /* =========================================
       CALCULATE CREDITS & BACKLOGS
    ========================================= */
    let earnedCredits = 0;

    let backlogCount = 0;

    subjects.forEach((s) => {

      const grade =
        s.grade?.toUpperCase();

      if (grade === "F") {

        backlogCount++;

      } else {

        earnedCredits += Number(
          s.credits || 0
        );

      }

    });

    /* =========================================
       CHECK EXISTING SEMESTER
    ========================================= */
    let existingResult =
      await SemesterResult.findOne({

        studentEmail,
        semester,

      });

    let result;

    /* =========================================
       UPDATE EXISTING
    ========================================= */
    if (existingResult) {

      existingResult.subjects =
        subjects;

      existingResult.sgpa =
        Number(sgpa);

      existingResult.cgpa =
        Number(cgpa);

      existingResult.totalCredits =
        earnedCredits;

      existingResult.backlogCount =
        backlogCount;

      result =
        await existingResult.save();

    }

    /* =========================================
       CREATE NEW
    ========================================= */
    else {

      result =
        await SemesterResult.create({

          studentId,

          studentEmail,

          studentName,

          mentorEmail,

          mentorName,

          semester,

          subjects,

          sgpa: Number(sgpa),

          cgpa: Number(cgpa),

          totalCredits:
            earnedCredits,

          backlogCount,

        });

    }

    /* =========================================
       RECALCULATE TOTAL DATA
    ========================================= */
    const allResults =
      await SemesterResult.find({
        studentEmail,
      });

    let totalCompletedCredits = 0;

    let totalBacklogs = 0;

    allResults.forEach((r) => {

      totalCompletedCredits +=
        Number(r.totalCredits || 0);

      totalBacklogs +=
        Number(r.backlogCount || 0);

    });

    /* =========================================
       FIND STUDENT
    ========================================= */
    const student =
      await User.findById(studentId);

    if (!student) {

      return res.status(404).json({
        message:
          "Student not found",
      });

    }

    /* =========================================
       CALCULATE ACADEMIC STATUS
    ========================================= */
    const {
      academicStatus,
      yearsCompleted,
    } = calculateAcademicStatus(
      student,
      Number(cgpa),
      totalBacklogs
    );

    /* =========================================
       UPDATE USER
    ========================================= */
    await User.findByIdAndUpdate(
      studentId,
      {

        cgpa: Number(cgpa),

        backlogCount:
          totalBacklogs,

        completedCredits:
          totalCompletedCredits,

        academicStatus,

        yearsCompleted,

        semester:
          Number(semester),

      }
    );

    res.json({
      message:
        existingResult
          ? "Semester updated successfully"
          : "Semester submitted successfully",

      result,
    });

  } catch (err) {

    console.error(
      "Semester submit error:",
      err
    );

    res.status(500).json({
      message:
        "Failed to submit semester result",
    });

  }

});

/* =========================================
   DELETE SEMESTER RESULT
========================================= */
router.delete(
  "/delete/:id",
  async (req, res) => {

    try {

      const result =
        await SemesterResult.findById(
          req.params.id
        );

      if (!result) {

        return res.status(404).json({
          message:
            "Semester result not found",
        });

      }

      const student =
        await User.findById(
          result.studentId
        );

      await SemesterResult.findByIdAndDelete(
        req.params.id
      );

      /* =========================================
         RECALCULATE TOTALS
      ========================================= */
      const remainingResults =
        await SemesterResult.find({
          studentEmail:
            result.studentEmail,
        });

      let totalCredits = 0;

      let totalBacklogs = 0;

      let latestCgpa = 0;

      remainingResults.forEach((r) => {

        totalCredits +=
          Number(r.totalCredits || 0);

        totalBacklogs +=
          Number(r.backlogCount || 0);

        latestCgpa = r.cgpa;

      });

      /* =========================================
         UPDATE USER
      ========================================= */
      if (student) {

        const {
          academicStatus,
          yearsCompleted,
        } = calculateAcademicStatus(
          student,
          Number(latestCgpa || 0),
          totalBacklogs
        );

        await User.findByIdAndUpdate(
          student._id,
          {

            completedCredits:
              totalCredits,

            backlogCount:
              totalBacklogs,

            cgpa:
              latestCgpa || 0,

            academicStatus,

            yearsCompleted,

          }
        );

      }

      res.json({
        message:
          "Semester result deleted successfully",
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message:
          "Failed to delete semester result",
      });

    }

  }
);
/* =========================================
   GET STUDENT RESULTS
========================================= */
router.get(
  "/student/:email",
  async (req, res) => {

    try {

      const results =
        await SemesterResult.find({
          studentEmail:
            req.params.email,
        }).sort({
          semester: 1,
        });

      res.json(results);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message:
          "Failed to fetch results",
      });

    }

  }
);

/* =========================================
   GET SINGLE RESULT
========================================= */
router.get(
  "/result/:id",
  async (req, res) => {

    try {

      const result =
        await SemesterResult.findById(
          req.params.id
        );

      if (!result) {

        return res.status(404).json({
          message:
            "Result not found",
        });

      }

      res.json(result);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message:
          "Failed to fetch result",
      });

    }

  }
);

/* =========================================
   GET RESULTS FOR MENTOR
========================================= */
router.get(
  "/mentor/:mentorEmail",
  async (req, res) => {

    try {

      const results =
        await SemesterResult.find({
          mentorEmail:
            req.params.mentorEmail,
        }).sort({
          createdAt: -1,
        });

      res.json(results);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message:
          "Failed to fetch mentor results",
      });

    }

  }
);

/* =========================================
   DELETE RESULT
========================================= */
router.delete(
  "/delete/:id",
  async (req, res) => {

    try {

      const result =
        await SemesterResult.findById(
          req.params.id
        );

      if (!result) {

        return res.status(404).json({
          message:
            "Result not found",
        });

      }

      const studentId =
        result.studentId;

      await SemesterResult.findByIdAndDelete(
        req.params.id
      );

      const latest =
        await SemesterResult.findOne({
          studentId,
        }).sort({
          semester: -1,
        });

      await recalculateStudentAcademicData(
        studentId,
        latest?.cgpa || 0,
        latest?.semester || 1
      );

      res.json({
        message:
          "Result deleted successfully",
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message:
          "Failed to delete result",
      });

    }

  }
);

export default router;