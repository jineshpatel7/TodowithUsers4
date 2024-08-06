import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const connectionString = "postgres://todo%20list_owner:UfPWtTMAYV34@ep-shiny-lake-a1jsbhbj-pooler.ap-southeast-1.aws.neon.tech/todo%20list?idleTimeout=10000&sslmode=require"

const db= new pg.Client(connectionString)

db.connect();

export default db;

// const db = new pg.Client({
//     user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT
// })
// db.connect();

// We can do it like this too
/*const { Pool } = pg;

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const db = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  options: 'endpoint=hep-shiny-lake-a1jsbhbj.ap-southeast-1.aws.neon.tech',
  ssl: {
    require: true,
  },
});

db.connect();
export default db;*/

