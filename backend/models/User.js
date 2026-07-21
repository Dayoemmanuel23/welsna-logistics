import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,

    role: {
      type: String,
      default: "admin"
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);