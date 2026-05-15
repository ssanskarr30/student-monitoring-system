// ================= MESSAGEROUTES.JS =================

import express from "express";

import Message
from "../models/Message.js";

const router =
  express.Router();

/* ================= SEND MESSAGE ================= */
router.post(
  "/",
  async (req, res) => {

    try {

      const {

        senderEmail,

        receiverEmail,

        senderRole,

        text,

      } = req.body;

      if (
        !senderEmail ||
        !receiverEmail ||
        !senderRole ||
        !text
      ) {

        return res.status(400).json({
          message:
            "Missing required fields",
        });

      }

      const msg =
        await Message.create({

          senderEmail,

          receiverEmail,

          senderRole,

          text,

        });

      res.status(201).json(msg);

    } catch (err) {

      console.error(
        "Message save error:",
        err
      );

      res.status(500).json({
        message:
          "Failed to save message",
      });

    }

  }
);

/* ================= GET CHAT ================= */
router.get(
  "/:user1/:user2",
  async (req, res) => {

    try {

      const {
        user1,
        user2,
      } = req.params;

      const messages =
        await Message.find({

          $or: [

            {
              senderEmail:
                user1,

              receiverEmail:
                user2,
            },

            {
              senderEmail:
                user2,

              receiverEmail:
                user1,
            },

          ],

        }).sort({
          createdAt: 1,
        });

      res.json(messages);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message:
          "Failed to load messages",
      });

    }

  }
);

export default router;