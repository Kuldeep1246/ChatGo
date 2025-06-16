import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";

const Authrouter = express.Router();

Authrouter.post("/signup", signup);
Authrouter.post("/login", login);
Authrouter.post("/logout", logout);

Authrouter.put("/update-profile", protectRoute, updateProfile);

Authrouter.get("/check", protectRoute, checkAuth);

export default Authrouter;