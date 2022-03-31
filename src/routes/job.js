const { Router } = require("express");
const auth = require("../middlewares/auth");
const jobController = require("../controllers/job");
const router = Router();

// create a job
router.post("/", jobController.createJob);

// get all jobs
router.get("/", auth, jobController.findAllJobs);

// find single job
router.get("/:id", jobController.findSingleJob);

// update a job
router.patch("/:id", jobController.updateJob);

// delete a job
router.delete("/:id", jobController.deleteJob);

module.exports = router;
