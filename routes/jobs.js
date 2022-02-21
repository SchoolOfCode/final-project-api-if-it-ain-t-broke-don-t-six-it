import express from "express";
import { getAllJobs, getAllJobsByLocation } from "../models/jobs.js";

const router = express.Router();

/* GET users listing. */
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

export default router;
