import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      /* =====================================
         BASIC
      ===================================== */

      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        enum: [
          "student",
          "mentor",
          "hod",
          "admin",
        ],
        required: true,
      },

      /* =====================================
         STUDENT TYPE
      ===================================== */

      studentType: {
        type: String,
        enum: [
          "btech",
          "phd",
        ],
        default: "btech",
      },

      /* =====================================
         NORMAL STUDENTS
      ===================================== */

      rollNo: String,

      branch: String,

      semester: {
        type: Number,
        default: 1,
      },

      /* =====================================
         PHD
      ===================================== */

      researchArea: {
        type: String,
        default: "",
      },

      researchTopic: {
        type: String,
        default: "",
      },

      supervisorEmail: {
        type: String,
        default: "",
      },

      supervisorName: {
        type: String,
        default: "",
      },

      publications: {
        type: Number,
        default: 0,
      },

      synopsisApproved: {
        type: Boolean,
        default: false,
      },

      thesisSubmitted: {
        type: Boolean,
        default: false,
      },

      /* =====================================
         ACADEMIC
      ===================================== */

      cgpa: {
        type: Number,
        default: 0,
      },

      completedCredits: {
        type: Number,
        default: 0,
      },

      totalCreditsRequired: {
        type: Number,
        default: 163,
      },

      backlogCount: {
        type: Number,
        default: 0,
      },

      academicStatus: {
        type: String,
        default: "normal",
      },

      /* =====================================
         MENTOR
      ===================================== */

      mentorEmail: {
        type: String,
        default: null,
      },

      mentorName: {
        type: String,
        default: null,
      },

      /* =====================================
         PROFILE
      ===================================== */

      fatherName: {
        type: String,
        default: "",
      },

      motherName: {
        type: String,
        default: "",
      },

      personalPhone: {
        type: String,
        default: "",
      },

      parentPhone: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        default: "",
      },

      phoneVerified: {
        type: Boolean,
        default: false,
      },

      otpCode: {
        type: String,
        default: "",
      },

      otpExpiry: {
        type: Date,
      },

      /* =====================================
         ACCOUNT
      ===================================== */

      firstLogin: {
        type: Boolean,
        default: true,
      },

      mustChangePassword: {
        type: Boolean,
        default: true,
      },
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "User",
  userSchema
);