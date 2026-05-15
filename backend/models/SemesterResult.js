import mongoose from "mongoose";

const subjectSchema =
  new mongoose.Schema({

    courseCode: String,

    courseName: String,

    credits: {
      type: Number,
      default: 0,
    },

    grade: String,

  });

const semesterResultSchema =
  new mongoose.Schema(
    {
      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },

      studentEmail: String,

      studentName: String,

      mentorEmail: String,

      mentorName: String,

      semester: Number,

      subjects: [subjectSchema],

      sgpa: Number,

      cgpa: Number,

      totalCredits: {
        type: Number,
        default: 0,
      },

      backlogCount: {
        type: Number,
        default: 0,
      },

      isUpdated: {
        type: Boolean,
        default: false,
      },

      updatedCount: {
        type: Number,
        default: 0,
      },

    },
    {
      timestamps: true,
    }
  );

/* =========================================
   PREVENT DUPLICATE SEMESTERS
========================================= */
semesterResultSchema.index(
  {
    studentId: 1,
    semester: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "SemesterResult",
  semesterResultSchema
);