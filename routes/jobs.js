import express from "express";
import {
  getAllJobs,
  getAllJobsByLocation,
  createJob,
  createLocation,
  createJobTags,
} from "../models/jobs.js";

const router = express.Router();

/* GET */
router.get("/", async function (req, res) {
  try {
    const jobs = await getAllJobs();
    console.log(jobs);
    res.json({
      success: true,
      payload: jobs,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:location", async function (req, res) {
  try {
    let location = req.params.location;
    const jobs = await getAllJobsByLocation(location);
    console.log(jobs);
    res.json({
      success: true,
      payload: jobs,
    });
  } catch (err) {
    console.log(err);
  }
});

/*Create*/
let job;

//Adds to job table and then calls the next function to move on to next route
router.post("/", async function (req, res, next) {
  try {
    job = await createJob(req.body);
    next();
  } catch (err) {
    console.log(err);
  }
});

// let tags;
// router.post("/", async function (req, res, next) {
//   try {
//     tags = await createJobTags(req.body, job.job_id);
//     next();
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post("/", async function (req, res) {
  try {
    const location = await createLocation(req.body, job.job_id);

    res.json({
      success: true,
      payload: { job, location },
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
