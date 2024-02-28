import jwt from "jsonwebtoken";
import User from "../Models/User.model.js"
import dotenv from "dotenv";
dotenv.config();

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];

    if (!token) {
      return res.status(400).json({ error: "Token is missing!" });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decode.id;

    const user = await User.findOne({ _id: userId });
    console.log("Decoded User ID:", userId);

    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
};

export { isAuthenticated };
