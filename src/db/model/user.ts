import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: [true, "Password is required"],
  },
});

export const User = mongoose.model("User", UserSchema);
