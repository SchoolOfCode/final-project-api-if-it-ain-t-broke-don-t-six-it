import query from "../../connection.js";
import { appliedUsersData } from "../../data/appliedUsersData.js";

async function populateAppliedUsersTable() {
  appliedUsersData.forEach(async (user) => {
    const response = await query(
      `INSERT INTO applied_users (job_id,user_id) VALUES ($1,$2)`,
      [user.job_id, user.user_id]
    );
    console.log(response);
  });
}

populateAppliedUsersTable();
