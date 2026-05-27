import User from "../models/User.js";

// get current user profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      data: user,
      message: "Profile fetched"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// UPDATE PROFILE
export const updateWorkerProfile = async (req, res) => {
  try {
    const { skills, pricing, availability } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.role !== "worker") {
      return res.status(403).json({
        success: false,
        message: "Only workers can update profile"
      });
    }

    user.skills = skills || user.skills;
    user.pricing = pricing ?? user.pricing;
    user.availability = availability ?? user.availability;

    await user.save();

    res.status(200).json({
      success: true,
      data: user,
      message: "Worker profile updated"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};