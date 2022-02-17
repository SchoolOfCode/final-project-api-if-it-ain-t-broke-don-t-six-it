import query from "../../connection.js";

const response = await query(
  `CREATE TABLE IF NOT EXISTS jobs (job_id SERIAL PRIMARY KEY, title VARCHAR (255) NOT NULL, date INT NOT NULL, rate_of_pay MONEY NOT NULL, discription VARCHAR (2000) NOT NULL, requiement TEXT, user_id TEXT NOT NULL, accepted_user_id TEXT, status TEXT NOT NULL, user_image VARCHAR (2000),user_name TEXT NOT NULL, user_rating INT NOT NULL );`
);

console.log(response);
