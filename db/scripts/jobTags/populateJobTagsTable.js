import query from "../../connection.js";
import { jobTags } from "../../data/jobTagData.js";

async function populateJobTagsTable() {
  jobTags.forEach(async (jobTag) => {
    const response = await query(
      `INSERT INTO job_tag (job_id, tag_id)VALUES ($1, $2)`,
      [jobTag.job_id, jobTag.tag_id]
    );

    console.log(response.rows);
  });
}

populateJobTagsTable();
