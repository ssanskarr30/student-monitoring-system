import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/* =========================================================
   HELPERS
========================================================= */
const passwordFromEmail = (email) => email.slice(0, 8);

/* =========================================================
   CREATE HOD ONLY (ADMIN)
========================================================= */
router.post("/create-user", async (req, res) => {
  try {

    const { name, email, role } = req.body;

    if (role !== "hod") {

      return res.status(400).json({
        message: "Only HOD can be created here",
      });

    }

    const exists = await User.findOne({
      email,
    });

    if (exists) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    const rawPassword =
      passwordFromEmail(email);

    const hashed =
      await bcrypt.hash(
        rawPassword,
        10
      );

    await User.create({
      name,
      email,
      password: hashed,
      role: "hod",
      mustChangePassword: true,
      firstLogin: true,
    });

    console.log(
      `✔ HOD CREATED: ${email} | PASS: ${rawPassword}`
    );

    res.json({
      message: "HOD created successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
});

/* =========================================================
   MANUAL ASSIGN MENTOR (HOD)
========================================================= */
router.put("/assign-mentor/:studentId", async (req, res) => {

  try {

    const {
      mentorEmail,
      mentorName,
    } = req.body;

    await User.findByIdAndUpdate(
      req.params.studentId,
      {
        mentorEmail,
        mentorName,
      }
    );

    res.json({
      message: "Mentor assigned successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to assign mentor",
    });

  }

});

/* =========================================================
   UPLOAD MENTORS + ASSIGN STUDENTS
========================================================= */
router.post("/upload-mentor-assignments", async (req, res) => {

  try {

    const rows = req.body;

    let mentorsCreated = 0;
    let studentsUpdated = 0;

    for (const r of rows) {

      const mentorName =
        r.mentorName ||
        r["Mentor Name"] ||
        r["mentorName"];

      const mentorEmail =
        r.mentorEmail ||
        r["Mentor Email"] ||
        r["mentorEmail"];

      const studentRollNo =
        (
          r.studentRollNo ||
          r["Student Roll No"] ||
          ""
        )
          .toString()
          .trim();

      if (
        !mentorEmail ||
        !studentRollNo
      ) continue;

      /* ================= FIND OR CREATE MENTOR ================= */

      let mentor =
        await User.findOne({
          email: mentorEmail,
          role: "mentor",
        });

      if (!mentor) {

        const rawPassword =
          passwordFromEmail(
            mentorEmail
          );

        const hashed =
          await bcrypt.hash(
            rawPassword,
            10
          );

        mentor =
          await User.create({
            name:
              mentorName ||
              mentorEmail.split("@")[0],

            email: mentorEmail,

            password: hashed,

            role: "mentor",

            mustChangePassword: true,

            firstLogin: true,
          });

        console.log(
          `✔ MENTOR CREATED: ${mentorEmail} | PASS: ${rawPassword}`
        );

        mentorsCreated++;

      }

      /* ================= ASSIGN STUDENT ================= */

      const student =
        await User.findOne({
          rollNo: studentRollNo,
          role: "student",
        });

      if (!student) continue;

      student.mentorEmail =
        mentorEmail;

      student.mentorName =
        mentor.name;

      await student.save();

      studentsUpdated++;

    }

    res.json({
      message:
        "Mentor–Student assignment completed",

      mentorsCreated,

      studentsUpdated,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Upload failed",
    });

  }

});

/* =========================================================
   UPLOAD STUDENTS (UPDATED FOR PHD)
========================================================= */
router.post("/upload-students", async (req, res) => {

  try {

    const students = req.body;

    let created = 0;
    let skipped = 0;

    for (const s of students) {

      const name =
        s.name || s.Name;

      const email =
        s.email || s.Email;

      const rollNo =
        (
          s.rollNo ||
          s.RollNo ||
          ""
        )
          .toString()
          .trim();

      const branch =
        s.branch || s.Branch;

      const semester =
        Number(
          s.semester ||
          s.Semester ||
          1
        );

      /* ================= PHD FIELDS ================= */

      const studentType =
        (
          s.studentType ||
          s.StudentType ||
          "btech"
        ).toLowerCase();

      const researchArea =
        s.researchArea ||
        s.ResearchArea ||
        "";

      const researchTopic =
        s.researchTopic ||
        s.ResearchTopic ||
        "";

      const supervisorName =
        s.supervisorName ||
        s.SupervisorName ||
        "";

      const supervisorEmail =
        s.supervisorEmail ||
        s.SupervisorEmail ||
        "";

      const publications =
        Number(
          s.publications ||
          s.Publications ||
          0
        );

      if (
        !email ||
        !rollNo
      ) {

        skipped++;
        continue;

      }

      const exists =
        await User.findOne({
          email,
        });

      if (exists) {

        skipped++;
        continue;

      }

      const rawPassword =
        passwordFromEmail(
          email
        );

      const hashed =
        await bcrypt.hash(
          rawPassword,
          10
        );

      await User.create({

        name,
        email,
        rollNo,
        branch,
        semester,

        role: "student",

        /* ================= PHD SAVE ================= */

        studentType,

        researchArea,

        researchTopic,

        supervisorName,

        supervisorEmail,

        publications,

        password: hashed,

        mustChangePassword: true,

        firstLogin: true,
      });

      console.log(
        `✔ STUDENT CREATED: ${email} | PASS: ${rawPassword}`
      );

      created++;

    }

    res.json({
      created,
      skipped,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Upload failed",
    });

  }

});

/* =========================================================
   ADMIN DASHBOARD STATS
========================================================= */
router.get("/stats", async (req, res) => {

  const students =
    await User.countDocuments({
      role: "student",
    });

  const mentors =
    await User.countDocuments({
      role: "mentor",
    });

  const hods =
    await User.countDocuments({
      role: "hod",
    });

  const admins =
    await User.countDocuments({
      role: "admin",
    });

  res.json({
    students,
    mentors,
    hods,
    admins,
    meetings: 0,
    results: 0,
  });

});

/* =========================================================
   GET ALL USERS
========================================================= */
router.get("/users", async (req, res) => {

  const users =
    await User.find()
      .select("-password");

  res.json(users);

});

/* =========================================================
   DELETE USER
========================================================= */
router.delete("/users/:id", async (req, res) => {

  await User.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message:
      "User deleted successfully",
  });

});

/* =========================================================
   GET USER BY EMAIL
========================================================= */
router.get("/user-by-email/:email", async (req, res) => {

  try {

    const user =
      await User.findOne({
        email: req.params.email,
      }).select("-password");

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.json(user);

  } catch (err) {

    res.status(500).json({
      message:
        "Failed to fetch user",
    });

  }

});

/* =========================================================
   UPDATE USER PROFILE
========================================================= */
router.put("/user-by-email/:email", async (req, res) => {

  try {

    const { email } =
      req.params;

    const { name } =
      req.body;

    if (!name) {

      return res.status(400).json({
        message: "Name is required",
      });

    }

    const user =
      await User.findOneAndUpdate(
        { email },
        {
          $set: { name },
        },
        { new: true }
      ).select("-password");

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.json({
      message:
        "Profile updated successfully",
      user,
    });

  } catch (err) {

    console.error(
      "Profile update error:",
      err
    );

    res.status(500).json({
      message: "Server error",
    });

  }

});

export default router;