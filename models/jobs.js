import query from "../db/connection.js";

export async function getAllJobs() {
  const result = await query(
    `SELECT * FROM jobs INNER JOIN locations ON jobs.job_id = locations.job_id;`
  );
  return result.rows;
}

export async function getAllJobsByLocation(location) {
  const result = await query(
    `SELECT * FROM jobs INNER JOIN locations ON jobs.job_id = locations.job_id WHERE city = $1;`,
    [location]
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
  const data = await tag_id.map(async (tag) => {
    const result = await query(
      `INSERT INTO job_tag (job_id, tag_id) VALUES ($1, $2)
      RETURNING *;`,
      [job_id, tag.tag_id]
    );
    return result.rows[0];
  });
}

export async function getAllJobsByLocationAndKeyword(location, keyword) {
  const result = await query(
    `SELECT DISTINCT  * FROM jobs 
    INNER JOIN locations ON jobs.job_id = locations.job_id 
    INNER JOIN job_tag ON jobs.job_id = job_tag.job_id 
    INNER JOIN tag ON tag.tag_id = job_tag.tag_id
    WHERE city = $1 AND tag = $2 ;`,
    [location, keyword]
  );
  return result.rows;
}

export async function getAllJobsByKeyword(keyword) {
  const result = await query(
    `SELECT DISTINCT  * FROM jobs 
INNER JOIN job_tag ON jobs.job_id = job_tag.job_id 
INNER JOIN tag ON tag.tag_id = job_tag.tag_id
WHERE tag = $1 ;`,
    [keyword]
  );
  return result.rows;
}
