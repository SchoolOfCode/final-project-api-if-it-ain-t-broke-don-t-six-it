// this environment variable gets handed to us by heroku if we use the postgres add-on
export const connectionString = process.env.DATABASE_URL;
