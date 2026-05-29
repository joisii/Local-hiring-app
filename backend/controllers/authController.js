import jwt from "jsonwebtoken";

import User from "../models/User.js";

import {
  generateAccessToken , generateRefreshToken
} from "../utils/generateTokens.js";

export const refreshAccessToken =
  async (req, res) => {

  try {

    const refreshToken =
      req.cookies.refreshToken;

    console.log(
      "COOKIE TOKEN:",
      refreshToken
    );

    if (!refreshToken) {

      return res.status(401).json({
        success:false,
        message:"Refresh token missing"
      });
    }

    // verify token
    const decoded =
      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );

    console.log(
      "DECODED:",
      decoded
    );

    const user =
      await User.findById(
        decoded.id
      );

    if (!user) {

      return res.status(403).json({
        success:false,
        message:"User not found"
      });
    }

    console.log(
      "DB TOKEN:",
      user.refreshToken
    );

    if (
      String(user.refreshToken).trim()
      !==
      String(refreshToken).trim()
    ) {

      return res.status(403).json({
        success:false,
        message:"Refresh token mismatch"
      });
    }

    // new access token
    const accessToken =
      generateAccessToken(user);

    return res.status(200).json({

      success:true,

      data:{ accessToken },

      message:
        "Access token refreshed"
    });

  } catch (err) {

    console.log(
      "REFRESH ERROR:",
      err
    );

    return res.status(403).json({

      success:false,

      message:err.message
    });
  }
};

export const logoutUser = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      );

    if (user) {

      user.refreshToken = null;

      await user.save();
    }

    // clear cookie only
    res.clearCookie(
      "refreshToken",
      {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      }
    );

    res.status(200).json({

      success:true,

      message:
        "Logged out successfully"
    });

  } catch(err) {

    res.status(500).json({

      success:false,

      message:err.message
    });
  }
};