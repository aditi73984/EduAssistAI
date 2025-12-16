import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["student", "creator"], required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },


   // optional / profile fields
  phone: { type: String },
  otpVerified: { type: Boolean, default: false },
  // student fields
  college: String,
  course: String,
  stream: String,
  level: { type: String, enum: ["fresher", "intermediate", "advanced"] },
  last_education: {
    course: String,
    college: String,
    stream: String,
  },
  interested_streams: [String],

  // creator fields
  creator_role: String,
  subject_specialist: String,
  phone: String,
  otp: String,
  otpVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

export default User;
