import express from "express";
import {
  getAllJobs,
  getAllJobsByLocation,
  createJob,
  createLocation,
  createJobTag,
  getAllJobsByLocationAndKeyword,
  getAllJobsByKeyword,
} from "../models/jobs.js";

const router = express.Router();

/* GET */
router.get("/", async function (req, res) {
  let offSet = req.query.offSet;
  try {
    let jobs;
    if (req.query.keyword === undefined) {
      jobs = await getAllJobs(offSet);
    } else {
      const keyword = req.query.keyword;
      jobs = await getAllJobsByKeyword(keyword, offSet);
    }
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
  let offSet = req.query.offSet;
  try {
    let jobs;
    let location = req.params.location;

    if (req.query.keyword === undefined) {
      jobs = await getAllJobsByLocation(location, offSet);
    } else {
      const keyword = req.query.keyword;
      jobs = await getAllJobsByLocationAndKeyword(location, keyword, offSet);
    }
    res.json({
      success: true,
      payload: jobs,
    });
  } catch (err) {
    res.status(500).json(err.stack);
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

router.post("/", async function (req, res, next) {
  try {
    const createdTagId = await createJobTag(job.job_id, req.body.tags);
    next();
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async function (req, res) {
  try {
    const location = await createLocation(req.body, job.job_id);
    let tags = req.body.tags;
    res.json({
      success: true,
      payload: { job, location, tags },
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
