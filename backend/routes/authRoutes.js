import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* ================================
   LOGIN
================================ */
router.post("/login", async (req, res) => {

  try {

    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(401).json({
        message: "Invalid credentials",
      });

    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {

      return res.status(401).json({
        message: "Invalid credentials",
      });

    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,

      user: {
        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        rollNo: user.rollNo,

        branch: user.branch,

        semester: user.semester,

        mentorEmail:
          user.mentorEmail || null,

        mentorName:
          user.mentorName || null,

        fatherName:
          user.fatherName || "",

        motherName:
          user.motherName || "",

        personalPhone:
          user.personalPhone || "",

        parentPhone:
          user.parentPhone || "",

        address:
          user.address || "",

        phoneVerified:
          user.phoneVerified || false,

        firstLogin:
          user.firstLogin,

        mustChangePassword:
          user.mustChangePassword,
      },
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

/* ================================
   AUTH ME
================================ */
router.get("/me", async (req, res) => {

  try {

    const auth =
      req.headers.authorization;

    if (!auth) {

      return res.status(401).json({
        message: "No token",
      });

    }

    const token =
      auth.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const user =
      await User.findById(
        decoded.id
      );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.json(user);

  } catch (err) {

    res.status(401).json({
      message: "Invalid token",
    });

  }

});

/* ================================
   CHANGE PASSWORD
================================ */
router.post(
  "/change-password",
  async (req, res) => {

    try {

      const {
        userId,
        newPassword,
      } = req.body;

      const hashed =
        await bcrypt.hash(
          newPassword,
          10
        );

      await User.findByIdAndUpdate(
        userId,
        {
          password: hashed,

          firstLogin: false,

          mustChangePassword: false,
        }
      );

      res.json({
        message:
          "Password updated successfully",
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);

/* ================================
   UPDATE PROFILE
================================ */
router.put(
  "/user-by-email/:email",
  async (req, res) => {

    try {

      const user =
        await User.findOne({
          email: req.params.email,
        });

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });

      }

      user.name =
        req.body.name || user.name;

      user.fatherName =
        req.body.fatherName ||
        user.fatherName;

      user.motherName =
        req.body.motherName ||
        user.motherName;

      user.personalPhone =
        req.body.personalPhone ||
        user.personalPhone;

      user.parentPhone =
        req.body.parentPhone ||
        user.parentPhone;

      user.address =
        req.body.address ||
        user.address;

      await user.save();

      res.json({
        message:
          "Profile updated successfully",
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);

/* ================================
   SEND OTP
================================ */
router.post(
  "/send-phone-otp",
  async (req, res) => {

    try {

      const { userId } = req.body;

      const otp = Math.floor(
        100000 +
          Math.random() * 900000
      ).toString();

      const expiry = new Date(
        Date.now() +
          5 * 60 * 1000
      );

      await User.findByIdAndUpdate(
        userId,
        {
          otpCode: otp,
          otpExpiry: expiry,
        }
      );

      console.log(
        "PHONE OTP =>",
        otp
      );

      res.json({
        message:
          "OTP sent successfully",
      });

    } catch (err) {

      res.status(500).json({
        message:
          "Failed to send OTP",
      });

    }

  }
);

/* ================================
   VERIFY OTP
================================ */
router.post(
  "/verify-phone-otp",
  async (req, res) => {

    try {

      const { userId, otp } =
        req.body;

      const user =
        await User.findById(userId);

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });

      }

      if (
        user.otpCode !== otp ||
        new Date() >
          user.otpExpiry
      ) {

        return res.status(400).json({
          message:
            "Invalid or expired OTP",
        });

      }

      user.phoneVerified = true;

      user.otpCode = "";

      await user.save();

      res.json({
        message:
          "Phone verified successfully",
      });

    } catch (err) {

      res.status(500).json({
        message:
          "Verification failed",
      });

    }

  }
);

export default router;