import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["client","worker"],
        required:true
    },

    // 🔽 NEW FIELDS
  skills: {
    type: [String],
    default: []
  },
  pricing: {
    type: Number,
    default: 0
  },
  availability: {
    type: Boolean,
    default: true
  }

}, {timestamps:true});
 
export default mongoose.model ("User",userSchema);