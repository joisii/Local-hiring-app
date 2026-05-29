
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/generateTokens.js";


// LOGIN USER
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required"
      });
    }

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password does not match"
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    // Save refresh token in DB
    user.refreshToken = refreshToken;

    await user.save();

 

    // Set refresh token in cookie
res.cookie(
  "refreshToken",
  refreshToken,
  {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge:
      7 * 24 * 60 * 60 * 1000
  }
);

    // Final response
    const userData = user.toObject();

delete userData.password;
delete userData.refreshToken;

res.status(200).json({

  success:true,

  data:{

    accessToken,

    user:userData
  },

  message:"Login successfully"
});

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
};