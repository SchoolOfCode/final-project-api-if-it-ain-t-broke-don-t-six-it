import query from "../../connection.js";

async function createJobTagsTable() {
  const response = await query(
    `CREATE TABLE IF NOT EXISTS job_tag(job_id INT NOT NULL, tag_id INT NOT NULL)`
  );
  console.log(response);
}
createJobTagsTable();
