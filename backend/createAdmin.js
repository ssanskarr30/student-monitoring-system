import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "./models/User.js";

dotenv.config();

async function createAdmin() {
  try {

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");

    const hashedPassword =
      await bcrypt.hash("admin123", 10);

    // DELETE OLD ADMIN
    await User.deleteMany({
      email: "admin@admin.com",
    });

    // CREATE NEW ADMIN
    await User.create({
      name: "Admin",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "admin",
      firstLogin: false,
      mustChangePassword: false,
      status: "active",
    });

    console.log("✅ Admin created successfully");

    console.log("Email: admin@admin.com");
    console.log("Password: admin123");

    process.exit();

  } catch (err) {

    console.error(err);

    process.exit(1);

  }
}

createAdmin();