import express from "express";
import { getTags } from "../models/tag.js";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const tags = await getTags();
    res.json({
      success: true,
      payload: tags,
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
