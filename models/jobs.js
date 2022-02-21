import query from "../db/connection.js";

export async function getAllJobs() {
  const result = await query(`SELECT * FROM jobs;`);
  return result.rows;
}

export async function getAllJobsByLocation(location) {
  const result = await query(
    `SELECT * FROM jobs INNER JOIN locations ON jobs.job_id = locations.job_id WHERE city = $1;`,
    [location]
  );
  return result.rows
}
