const { throwError } = require("../errors/custom-error");
const Job = require("../models/job");

// Create a jobs
const createJob = async (req, res) => {
  const job = new Job({ ...req.body, createdBy: req.user._id });
  await job.save();
  res.status(201).send(job);
};

// find all jobs
const findAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id }).sort("createdAt");
  res.status(200).send({ jobs, count: jobs.length });
};

// find single job
const findSingleJob = async (req, res) => {
  // destructure the id of the job and the id of the user made the request
  const {
    params: { id: jobId },
    user: { _id: userId },
  } = req;

  // searching for the job
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throwError("Job not found", 404);
  }

  // return the job back
  res.status(200).send(job);
};

// update a job
const updateJob = async (req, res) => {
  res.send({
    process: "Update job",
    data: req.body,
  });
};

// delete job
const deleteJob = async (req, res) => {
  // destructure the id of the job and the id of the user made the request
  const {
    params: { id: jobId },
    user: { _id: userId },
  } = req;

  // searching for the job
  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });
  if (!job) {
    throwError("Job not found", 404);
  }

  // return the job back
  res.status(200).send(job);
};

module.exports = {
  findAllJobs,
  findSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
