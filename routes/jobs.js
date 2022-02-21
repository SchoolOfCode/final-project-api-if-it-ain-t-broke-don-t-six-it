import express from "express";
import { getAllJobs, getAllJobsByLocation, createJob } from "../models/jobs.js";

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
router.post("/", async function (req, res, next) {
  try {
    job = await createJob(req.body);

    res.json({
      success: true,
      payload: job,
    });
    next();
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const location = await createLocation(req.body, job.job_id);

    res.json({
      success: true,
      payload: job,
    });
    next();
  } catch (err) {
    console.log(err);
  }
});

export default router;
