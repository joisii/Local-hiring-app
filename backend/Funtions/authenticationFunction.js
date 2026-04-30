import User from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

//Login

export const loginUser=async(req,res)=>{
try{
      const {email,password}=req.body;

      //validation
      if(!email || !password){
     return   res.status(400).json({
            success:false,
            message:"Email and Password required"
        });
      }

      //checkuser
      const user = await User.findOne({ email });
      if (!user){
       return  res.status(400).json({
            success:false,
            message:"Invalid Credentials"
        });
      }


      //comparepassword
      const isMatch=await bcrypt.compare(password,user.password);
      if(!isMatch){
      return   res.status(400).json({
            success:false,
            message:"Password are not matching"
        });
      }

      //token
      const token=jwt.sign({
        id:user._id,role:user.role },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
    );
const userData = user.toObject();
delete userData.password;
    res.status(200).json({
        success:true,
        data:{
            token,
            user:userData
        },
        message:"Login successfully"
    });

}catch(err){
  res.status(500).json({
    success:false,
    message:err.message
  });
}
}