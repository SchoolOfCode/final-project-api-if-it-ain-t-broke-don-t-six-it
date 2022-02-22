import query from "../../connection.js";
import { jobsData } from "../../data/jobsData.js";

async function populateJobTable() {
  jobsData.forEach(async (job) => {
    const response = await query(
      `INSERT INTO jobs (accepted_user_id, date, description, rate_of_pay, requirement, status, title, user_id, user_image, user_name, user_rating) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11);`,
      [
        job.accepted_user_id,
        job.date,
        job.description,
        job.rate_of_pay,
        job.requirement,
        job.status,
        job.title,
        job.user_id,
        job.user_image,
        job.user_name,
        job.user_rating,
      ]
    );
    console.log(response);
  });
}

populateJobTable();
