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
  res.send("all jobs");
};

// find single job
const findSingleJob = async (req, res) => {
  res.send(`Single job: ${req.params.id}`);
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
  res.send(`delete job: ${req.params.id}`);
};

module.exports = {
  findAllJobs,
  findSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
