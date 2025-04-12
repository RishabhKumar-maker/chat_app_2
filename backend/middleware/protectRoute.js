import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    // 🛑 Use the correct cookie name
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // 🔓 Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // match your token secret env
    if (!decoded?.userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid token payload" });
    }

    // 👤 Fetch user without password and token fields
    const user = await User.findById(decoded.userId).select("-password -refreshToken");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please login again." });
    }

    return res.status(500).json({ message: "Server error in auth middleware" });
  }
};

export default protectRoute;
