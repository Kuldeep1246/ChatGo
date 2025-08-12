import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(400).json({ message: "user not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `finding user error ${error.message}` });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name } = req.body;
    let image;

    if (req.file) {
     console.log(req.file)
     image = await uploadOnCloudinary(req.file?.path)
    }

    let user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (name) user.name = name;
    if (image) user.image = image;

    await user.save();
    if (!user) return res.status(400).json({ message: "user not found" });

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `update error: ${error.message}` });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId }
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: `get users: ${error.message}` });
  }
};
