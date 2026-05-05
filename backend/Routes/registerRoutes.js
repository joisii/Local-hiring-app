import express from "express";
import { registerUser } from "../Funtions/registrationFunction.js";
import { loginUser } from "../Funtions/authenticationFunction.js";

const router =express.Router();

router.post ("/register",registerUser);
router.post("/login",loginUser);

export default router;