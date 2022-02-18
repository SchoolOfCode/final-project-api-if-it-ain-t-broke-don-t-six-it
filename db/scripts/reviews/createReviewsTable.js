import query from "../../connection.js";

async function createReviewsTable() {
  const response = await query(
    `CREATE TABLE IF NOT EXISTS reviews (
            review_id SERIAL PRIMARY KEY, user_id TEXT NOT NULL, review VARCHAR(2000), rating DECIMAL(2,1), category TEXT NOT NULL
        ) `
  );
  console.log(response);
}
createReviewsTable();
