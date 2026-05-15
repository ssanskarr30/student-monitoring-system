import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    studentEmail: { type: String, required: true },
    studentName: { type: String, required: true },

    mentorEmail: { type: String, required: true },
    mentorName: { type: String, required: true },

    date: { type: String, required: true },
    topic: { type: String, required: true },
    notes: { type: String }, // optional

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: { type: String }, // 👈 IMPORTANT
  },
  { timestamps: true }
);

export default mongoose.model("Meeting", meetingSchema);