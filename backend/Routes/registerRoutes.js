import express from "express";
import { registerUser } from "../Funtions/registrationFunction.js";
import { loginUser } from "../Funtions/authenticationFunction.js";
import { refreshAccessToken  ,logoutUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router =express.Router();

router.post ("/register",registerUser);
router.post("/login",loginUser);


router.post("/refresh-token", refreshAccessToken);

router.post(
  "/logout",
  protect,
  logoutUser
);
export default router;