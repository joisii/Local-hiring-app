import Job from "../models/Job.js";

// CREATE JOB (CLIENT ONLY)
export const createJob = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const job = await Job.create({
      title,
      description,
      budget,
      client: req.user.id
    });

    res.status(201).json({
      success: true,
      data: job,
      message: "Job created successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};