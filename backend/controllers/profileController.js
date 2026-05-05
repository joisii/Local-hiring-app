import User from "../models/User.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      data: user,
      message: "Profile fetched"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, skills, pricing, availability } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // update common fields
    if (name) user.name = name;

    // update worker-specific fields ONLY if worker
    if (user.role === "worker") {
      if (skills) user.skills = skills;
      if (pricing !== undefined) user.pricing = pricing;
      if (availability !== undefined) user.availability = availability;
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: user,
      message: "Profile updated"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};