import query from "../../connection.js";

async function createJobTable() {
  const response = await query(
    `CREATE TABLE IF NOT EXISTS jobs (job_id SERIAL PRIMARY KEY, title VARCHAR (255) NOT NULL, date INT NOT NULL, rate_of_pay MONEY NOT NULL, description VARCHAR (2000) NOT NULL, requirement TEXT, user_id TEXT NOT NULL, accepted_user_id TEXT, status TEXT NOT NULL, user_image VARCHAR (2000),user_name TEXT NOT NULL, user_rating DECIMAL (2,1) NOT NULL, timestamp TIMESTAMPTZ NOT NULL DEFAULT(NOW()));`
  );
  console.log(response);
}

createJobTable();
