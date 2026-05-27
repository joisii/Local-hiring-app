import Job from "../models/Job.js";
import mongoose from "mongoose";

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

    const jobs = await Job.find({
      status: "pending"
    })
      .populate("client", "name email")
      .populate("worker", "name email");

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

// Update Job Status
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID"
      });
    }

    // Allowed statuses
    const allowedStatuses = ["ongoing", "completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    // Find Job
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Only assigned worker can update
    if (!job.worker || job.worker.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized for this job"
      });
    }

    // Workflow validation
    // accepted -> ongoing -> completed

    if (status === "ongoing" && job.status !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Only accepted jobs can move to ongoing"
      });
    }

    if (status === "completed" && job.status !== "ongoing") {
      return res.status(400).json({
        success: false,
        message: "Only ongoing jobs can move to completed"
      });
    }

    // Prevent updating completed jobs again
    if (job.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Completed jobs cannot be updated"
      });
    }

    // Update status
    job.status = status;

    await job.save();

    res.status(200).json({
      success: true,
      data: job,
      message: `Job marked as ${status}`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getWorkerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      worker: req.user.id
    }).populate("client", "name email");

    res.status(200).json({
      success: true,
      data: jobs,
      message: "Worker jobs fetched"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getClientJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      client: req.user.id
    }).populate("worker", "name email");

    res.status(200).json({
      success: true,
      data: jobs,
      message: "Client jobs fetched"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};