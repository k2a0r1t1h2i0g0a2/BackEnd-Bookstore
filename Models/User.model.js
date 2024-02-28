import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requried: true,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
const User = mongoose.model("User", userSchema);

export default User;
