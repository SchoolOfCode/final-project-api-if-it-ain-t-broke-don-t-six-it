import query from "../../connection.js";

async function createFavouritesTable() {
  const response = await query(`CREATE TABLE IF NOT EXISTS favourites (
        user_id TEXT NOT NULL, job_id INT NOT NULL);`);
  console.log(response);
}
createFavouritesTable();
