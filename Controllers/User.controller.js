import bcrypt from "bcrypt";
import User from "../Models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ error: "User already exist !" });
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, saltRound);

    user = await new User({ ...req.body, password: hashPassword }).save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res
      .status(200)
      .json({ success: true, message: "Successfully registered", token });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: " Invalid email !" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res
      .status(200)
      .json({ success: true, message: "Successfully logged in", token });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, newpassword, confirmpassword } = req.body;
  try {
    if (newpassword !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found !" });
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newpassword, saltRound);
    user.password = hashPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
