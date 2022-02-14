import pg from "pg";

import { connectionString } from "../config.js";

const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
