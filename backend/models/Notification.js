import mongoose from "mongoose";

const notificationSchema =
  new mongoose.Schema(
    {
      userEmail: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        enum: [
          "meeting",
          "academic",
          "warning",
          "system",
        ],
        default: "system",
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

export default mongoose.model(
  "Notification",
  notificationSchema
);