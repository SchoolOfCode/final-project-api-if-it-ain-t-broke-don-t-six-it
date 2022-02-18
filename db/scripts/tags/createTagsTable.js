import query from "../../connection.js";

async function createTagsTable() {
  const response = await query(`CREATE TABLE IS NOT EXISTS`);
}
