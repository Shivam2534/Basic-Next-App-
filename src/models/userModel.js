import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is a required field"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    ForgotPasswordToken: String,
    ForgotPasswordTokenExpiry: Date,
    VerifyToken: String,
    VerifyTokenExpiry: Date,
  },
  { timestamps: true }
);

export const  User =
  mongoose.models.users || mongoose.model("users", userSchema);
