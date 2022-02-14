import db from "../../connection.js";

const response = await db.query(
  `INSERT INTO users (username, first_name, last_name) VALUES ($1, $2, $3);`,
  ["iseecode", "Chris", "Code"]
);

console.log(response);

db.end();
