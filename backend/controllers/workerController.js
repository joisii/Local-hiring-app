import User from "../models/User.js";

// GET ALL WORKERS WITH FILTERS
export const getWorkers = async (req, res) => {
  try {
    const { skills, minPrice, maxPrice, availability } = req.query;

    let query = { role: "worker" };

    // Filter by skills
    if (skills) {
      query.skills = { $in: skills.split(",") };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.pricing = {};
      if (minPrice) query.pricing.$gte = Number(minPrice);
      if (maxPrice) query.pricing.$lte = Number(maxPrice);
    }

    // Filter by availability
    if (availability !== undefined) {
      query.availability = availability === "true";
    }

    const workers = await User.find(query).select("-password");

    res.status(200).json({
      success: true,
      data: workers,
      message: "Workers fetched successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};