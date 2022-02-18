import query from "../../connection.js";
import { locationsData } from "../../data/locationsData.js";

async function populateLocationsTable() {
  locationsData.forEach(async (locations) => {
    const response = await query(
      `INSERT INTO locations (job_id, number, name, street, city, county, postcode) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        locations.job_id,
        locations.number,
        locations.name,
        locations.street,
        locations.city,
        locations.county,
        locations.postcode,
      ]
    );
    console.log(response);
  });
}
populateLocationsTable();
