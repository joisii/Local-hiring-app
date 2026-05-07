import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  worker: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null
},
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);