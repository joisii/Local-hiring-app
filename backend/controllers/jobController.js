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

    let jobs;

    // worker dashboard logic
    if (req.user.role === "worker") {

      jobs = await Job.find({
        $or: [

          // show available jobs
          { status: "pending" },

          // show jobs accepted by current worker
          { worker: req.user.id }

        ]
      })
        .populate("client", "name email")
        .populate("worker", "name email");

    }

    // client dashboard logic
    else if (req.user.role === "client") {

      jobs = await Job.find({
        client: req.user.id
      })
        .populate("client", "name email")
        .populate("worker", "name email");

    }

    // fallback
    else {

      jobs = [];

    }

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

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // only assigned worker can update
    if (job.worker.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    // valid transitions
    const validTransitions = {
      accepted: "ongoing",
      ongoing: "completed"
    };

    if (validTransitions[job.status] !== status) {
      return res.status(400).json({
        success: false,
        message: `Cannot move from ${job.status} to ${status}`
      });
    }

    job.status = status;

    await job.save();

    res.status(200).json({
      success: true,
      data: job,
      message: `Job marked as ${status}`
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
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