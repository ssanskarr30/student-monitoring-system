import express from "express";

import Notification from "../models/Notification.js";

const router = express.Router();

/* =========================================
   GET USER NOTIFICATIONS
========================================= */
router.get("/:email", async (req, res) => {

  try {

    const notifications =
      await Notification.find({
        userEmail: req.params.email,
      }).sort({
        createdAt: -1,
      });

    res.json(notifications);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message:
        "Failed to fetch notifications",
    });

  }

});

/* =========================================
   MARK AS READ
========================================= */
router.put(
  "/read/:id",
  async (req, res) => {

    try {

      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          isRead: true,
        }
      );

      res.json({
        message:
          "Notification marked as read",
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message:
          "Failed to update notification",
      });

    }

  }
);

export default router;