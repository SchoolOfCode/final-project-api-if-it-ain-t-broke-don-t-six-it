import pg from "pg";

import { connectionString } from "../config.js";

const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function query(text, params) {
  return await pool.query(text, params);
}
