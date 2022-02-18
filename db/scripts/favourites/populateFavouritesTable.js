import query from "../../connection.js";
import { favouritesData } from "../../data/favouritesData.js";

async function populateFavouritesTable() {
  favouritesData.forEach(async (favourite) => {
    const response = await query(
      `INSERT INTO favourites (user_id,job_id) VALUES ($1,$2)`,
      [favourite.user_id, favourite.job_id]
    );
    console.log(response);
  });
}
populateFavouritesTable();
