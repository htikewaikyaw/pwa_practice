import dotenv from 'dotenv';
// load from .env
dotenv.config();
import pg from 'pg';

// get database info from env
const mainDatabaseUrl = process.env.DATABASE_URL as string;
const parsedUrl = new URL(mainDatabaseUrl);
const dbUser = parsedUrl.username;
const dbPassword = parsedUrl.password;
const dbHost = parsedUrl.hostname;
const dbName = parsedUrl.pathname.slice(1);

export const database = {
  dbUser,
  dbHost,
  dbPassword,
  dbName,
};

export const pool = new pg.Pool({
  user: database.dbUser,
  host: database.dbHost,
  database: database.dbName,
  password: database.dbPassword,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
