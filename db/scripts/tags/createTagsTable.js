import query from "../../connection.js";

async function createTagsTable() {
  const response = await query(
    `CREATE TABLE IF NOT EXISTS tag(tag_id SERIAL PRIMARY KEY,tag TEXT NOT NULL);`
  );

  console.log(response);
}

createTagsTable();
