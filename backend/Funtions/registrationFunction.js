import User from "../models/User.js";
import bcrypt from "bcryptjs"

export const registerUser = async (req,res)=>{
    try{
           const {name,email,password,role}=req.body;
              // validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
      // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }


    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      data: user,
      message: "User registered successfully"
    });

    } catch (err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }

;}