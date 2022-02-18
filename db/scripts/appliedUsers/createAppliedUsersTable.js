import query from "../../connection.js";

async function createAppliedUsersTable() {
  const response = await query(
    `CREATE TABLE IF NOT EXISTS applied_users(job_id INT NOT NULL, user_id TEXT NOT NULL);`
  );
  console.log(response);
}

createAppliedUsersTable();
