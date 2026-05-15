// ================= MESSAGE.JS =================

import mongoose from "mongoose";

const messageSchema =
  new mongoose.Schema(

    {

      senderEmail: {

        type: String,

        required: true,

      },

      receiverEmail: {

        type: String,

        required: true,

      },

      senderRole: {

        type: String,

        enum: [
          "student",
          "mentor",
        ],

        required: true,

      },

      text: {

        type: String,

        required: true,

      },

      read: {

        type: Boolean,

        default: false,

      },

    },

    {
      timestamps: true,
    }

  );

export default mongoose.model(
  "Message",
  messageSchema
);