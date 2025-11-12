import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.substring(7) : null;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    // optional: attach user object if needed
    // req.user = await User.findById(req.userId).select("_id name email");

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
