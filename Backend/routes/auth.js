import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

// import multer from "multer";
// import path from "path";

const router = express.Router();

// Temporary in-memory OTP store
let otpStore = {};


// ✅ SEND OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: "Phone required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[phone] = { otp, verified: false, expires: Date.now() + 5 * 60 * 1000 };

    console.log(`📱 OTP for ${phone}: ${otp}`);
    res.json({ message: "OTP sent successfully (check console)" });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const record = otpStore[phone];
    if (!record) return res.status(400).json({ error: "No OTP found for this phone" });
    if (record.expires < Date.now()) return res.status(400).json({ error: "OTP expired" });
    if (record.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

    otpStore[phone].verified = true;
    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password, role, phone } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });

    // If content creator, ensure OTP verified
    if (role === "creator") {
      const record = otpStore[phone];
      if (!record || !record.verified)
        return res.status(400).json({ error: "Phone not verified. Please verify OTP first." });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body, password: hashed });
    await newUser.save();

    // Clear OTP record after successful registration
    if (phone) delete otpStore[phone];

    res.json({ message: "Registered successfully", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { role, email, password } = req.body;
  try {
    const user = await User.findOne({ email, role });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ error: "Invalid email or password" });

    // create JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
const fullName = user.name || "";
const parts = fullName.trim().split(" ");
const firstName = parts[0] || "";
const lastName = parts.slice(1).join(" ") || "";


   res.json({
  message: "Login successful",
  token,
  role: user.role,
  // user: {
  //   _id: user._id,
  //   firstName: user.firstName || "",
  //   lastName: user.lastName || "",
  //   name: user.name || "",
  //   email: user.email,
  //   role: user.role,
  //   profileImage: user.profileImage || "",
  // },
user: {
    _id: user._id,
    firstName,
    lastName,
    name: fullName,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage || "",
},

});

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ FORGOT PASSWORD (Email)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    // const resetLink = `http://localhost:3000/reset-password/${token}`;

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;



    // Configure email sender
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"EduAssistAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Password - EduAssistAI",
      html: `
        <h2>Reset Your Password</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.json({ message: "Reset email sent successfully" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Failed to send reset email" });
  }
});

// ✅ RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashed });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

export default router;
