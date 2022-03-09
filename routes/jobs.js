import express from "express";
import {
  getAllJobs,
  getAllJobsByLocation,
  createJob,
  createLocation,
  createJobTag,
  getAllJobsByLocationAndKeyword,
  getAllJobsByKeyword,
  getJobDataById,
  getTagsById,
  addAppliedUser,
  getPendingJobsById,
  getPostedJobsById,
  getUpcomingJobsById,
  getFavouriteJobIdById,
  getFavouriteJobById,
  addFavouriteJob,
  deleteFavouriteJob,
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

router.get("/job/:jobId", async function (req, res) {
  console.log("here");
  try {
    const jobId = req.params.jobId;
    const jobListingData = await getJobDataById(jobId);
    const jobTagsData = await getTagsById(jobId);
    console.log(jobTagsData);
    res.json({
      success: true,
      payload: {
        jobListingData,
        jobTagsData,
      },
    });
  } catch (err) {
    res.json(err.stack);
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
    res.json(err.stack);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const createdTagId = await createJobTag(job.job_id, req.body.tags);
    next();
  } catch (err) {
    res.json(err.stack);
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
    res.json(err.stack);
  }
});

router.post("/appliedUsers", async function (req, res) {
  const user_id = req.body.user_id;
  const job_id = req.body.job_id;
  try {
    const response = await addAppliedUser(job_id, user_id);
    res.json({ success: true, payload: response });
  } catch (err) {
    res.json(err.stack);
  }
});

router.get("/posted/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const postedJobs = await getPostedJobsById(userId);
    res.json({ success: true, payload: postedJobs });
  } catch (error) {
    res.json(error.stack);
  }
});

router.get("/pending/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const pendingJobs = await getPendingJobsById(userId);
    res.json({ success: true, payload: pendingJobs });
  } catch (error) {
    res.json(error.stack);
  }
});

router.get("/upcoming/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const upcomingJobs = await getUpcomingJobsById(userId);
    res.json({ success: true, payload: upcomingJobs });
  } catch (error) {
    res.json(error.stack);
  }
});

router.post("/favourites", async function (req, res) {
  try {
    const userId = req.body.userId;
    const jobId = req.body.jobId;
    const addedFavouriteJob = addFavouriteJob(userId, jobId);
    res.json({ success: true, payload: addedFavouriteJob });
  } catch (error) {
    res.json(error.stack);
  }
});

router.delete("/favourites", async function (req, res) {
  try {
    const userId = req.body.userId;
    const jobId = req.body.jobId;
    const deletedFavouriteJob = deleteFavouriteJob(userId, jobId);
    res.json({ success: true, payload: deletedFavouriteJob });
  } catch (error) {
    res.json(error.stack);
  }
});

router.get("/favourites/jobId/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    console.log(typeof userId);
    if (!userId) {
      res.json({ success: false, payload: "here" });
    }
    const favouriteJobsIds = await getFavouriteJobIdById(userId);
    res.json({ success: true, payload: favouriteJobsIds });
  } catch (error) {
    res.json(error.stack);
  }
});

router.get("/favourites/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const favouriteJobs = await getFavouriteJobById(userId);
    res.json({ success: true, payload: favouriteJobs });
  } catch (error) {
    res.json(error.stack);
  }
});

export default router;
