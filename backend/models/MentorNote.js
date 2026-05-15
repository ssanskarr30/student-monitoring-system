import mongoose from "mongoose";

const mentorNoteSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mentorEmail: {
      type: String,
      required: true,
    },

    mentorName: {
      type: String,
      required: true,
    },

    noteType: {
      type: String,
      enum: [
        "academic",
        "personal",
        "attendance",
        "career",
        "warning",
      ],
      default: "academic",
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    actionRequired: {
      type: Boolean,
      default: false,
    },

    followUpDate: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "MentorNote",
  mentorNoteSchema
);