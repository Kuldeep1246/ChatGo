import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
    // console.log(process.env.JWT_SECRET);
  try {
    const token = req.cookies?.token;
    // console.log(token)

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId; // assuming token contains { userId: '...' }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
