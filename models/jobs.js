import query from "../db/connection.js";

export async function getAllJobs(offSet) {
  const result = await query(
    `SELECT * FROM jobs INNER JOIN locations ON jobs.job_id = locations.job_id
    LIMIT 5 OFFSET $1 ;`,
    [offSet]
  );
  return result.rows;
}

export async function getAllJobsByLocation(location, offSet) {
  const result = await query(
    `SELECT * FROM jobs INNER JOIN locations ON jobs.job_id = locations.job_id WHERE city = $1
    LIMIT 5 OFFSET $2;`,
    [location, offSet]
  );
  return result.rows;
}

export async function createJob(job) {
  const {
    accepted_user_id,
    date,
    description,
    rate_of_pay,
    requirement,
    status,
    title,
    user_id,
    user_image,
    user_name,
    user_rating,
  } = job;

  const result = await query(
    `INSERT INTO jobs(accepted_user_id, date, description, rate_of_pay, requirement, status, title, user_id, user_image, user_name, user_rating) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;`,
    [
      accepted_user_id,
      date,
      description,
      rate_of_pay,
      requirement,
      status,
      title,
      user_id,
      user_image,
      user_name,
      user_rating,
    ]
  );
  console.log(result.rows[0]);
  return result.rows[0];
}

export async function createLocation(locations, job_id) {
  const result = await query(
    `INSERT INTO locations (job_id, number, name, street, city, county, postcode) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [
      job_id,
      locations.number,
      locations.name,
      locations.street,
      locations.city,
      locations.county,
      locations.postcode,
    ]
  );
  console.log(result);
  return result.rows[0];
}

export async function createJobTag(job_id, tag_id) {
  if (tag_id === undefined || tag_id.length === 0) {
    return;
  }
  const data = await tag_id.map(async (tag) => {
    const result = await query(
      `INSERT INTO job_tag (job_id, tag_id) VALUES ($1, $2)
      RETURNING *;`,
      [job_id, tag]
    );
    return result.rows[0];
  });
}

export async function getAllJobsByLocationAndKeyword(
  location,
  keyword,
  offSet
) {
  const result = await query(
    `SELECT DISTINCT  * FROM jobs 
    INNER JOIN locations ON jobs.job_id = locations.job_id 
    INNER JOIN job_tag ON jobs.job_id = job_tag.job_id 
    INNER JOIN tag ON tag.tag_id = job_tag.tag_id
    WHERE city = $1 AND tag = $2 
    LIMIT 5 OFFSET $3;`,
    [location, keyword, offSet]
  );
  return result.rows;
}

export async function getAllJobsByKeyword(keyword, offSet) {
  const result = await query(
    `SELECT DISTINCT  * FROM jobs 
INNER JOIN job_tag ON jobs.job_id = job_tag.job_id 
INNER JOIN tag ON tag.tag_id = job_tag.tag_id
INNER JOIN locations on jobs.job_id = locations.job_id
WHERE tag = $1 
LIMIT 5 OFFSET $2;`,
    [keyword, offSet]
  );
  return result.rows;
}

export async function getJobDataById(jobId) {
  const result = await query(
    `SELECT * FROM jobs 
  INNER JOIN locations ON jobs.job_id = locations.job_id
  WHERE jobs.job_id = $1
  `,
    [jobId]
  );
  console.log(result.rows);
  return result.rows;
}

export async function getTagsById(jobId) {
  const result = await query(
    `SELECT * FROM tag
   INNER JOIN job_tag ON tag.tag_id = job_tag.tag_id
   WHERE job_tag.job_id = $1
   `,
    [jobId]
  );
  console.log(result.rows);
  return result.rows;
}

export async function addAppliedUser(job_id, user_id) {
  const result = await query(
    `INSERT INTO applied_users (job_id,user_id) VALUES ($1,$2) RETURNING *;
    `,
    [job_id, user_id]
  );
  return result.rows[0];
}

export async function getPostedJobsById(userId) {
  const result = await query(
    `SELECT * FROM jobs 
    INNER JOIN locations ON jobs.job_id = locations.job_id
    WHERE jobs.user_id = $1`,
    [userId]
  );
  return result.rows;
}

export async function getPendingJobsById(userId) {
  const result = await query(
    `SELECT * FROM jobs
INNER JOIN locations ON jobs.job_id = locations.job_id
INNER JOIN applied_users ON jobs.job_id = applied_users.job_id
WHERE applied_users.user_id = $1 AND 
jobs.status = 'open' `,
    [userId]
  );
  return result.rows;
}

export async function getUpcomingJobsById(userId) {
  const result = await query(
    `SELECT * FROM jobs 
    INNER JOIN locations on jobs.job_id = locations.job_id
    WHERE jobs.accepted_user_id = $1
    ORDER BY jobs.date DESC
`,
    [userId, Date.now()]
  );
  return result.rows;
}
