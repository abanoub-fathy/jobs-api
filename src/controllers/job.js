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
  const {
    params: { id: jobId },
    user: { _id: userId },
  } = req;

  // validate the update fields
  const validUpdates = ["status", "company", "position"];
  const updates = Object.keys(req.body);
  const isValidUpadteProcess = updates.every((update) =>
    validUpdates.includes(update)
  );
  // if the update operation is invalid
  if (!isValidUpadteProcess) throwError("Invalid Update Process", 400);

  // find the job to be updated
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) throwError("Job not Found", 404);

  // update the job
  updates.forEach((update) => (job[update] = req.body[update]));

  // save the chnages
  await job.save();

  // return the response back
  res.status(200).send(job);
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
