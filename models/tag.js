import query from "../db/connection.js";

export async function getTags() {
  const result = await query(`SELECT * FROM tag;`);

  return result.rows;
}
