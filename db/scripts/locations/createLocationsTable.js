import query from "../../connection.js";

async function createLocationTable() {
  const response = await query(
    `CREATE TABLE IF NOT EXISTS locations (job_id INT PRIMARY KEY, number INT, name TEXT, street TEXT NOT NULL, city TEXT NOT NULL, county TEXT, postcode VARCHAR (10)  )`
  );
  console.log("Location table created", response);
}

createLocationTable();
