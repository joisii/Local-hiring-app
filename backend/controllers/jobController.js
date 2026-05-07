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

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "pending" }).populate("client", "name email");

    res.status(200).json({
      success: true,
      data: jobs,
      message: "Jobs fetched"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const acceptJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Job already taken"
      });
    }

    job.worker = req.user.id;
    job.status = "accepted";

    await job.save();

    res.status(200).json({
      success: true,
      data: job,
      message: "Job accepted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};