import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { editProfile, getOtherUsers, getUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
const userRouter = express.Router();

userRouter.get("/current", isAuth, getUser);
userRouter.put("/edit_profile",isAuth,upload.single('image'),editProfile)
userRouter.get("/others",isAuth,getOtherUsers)

export default userRouter;
