require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

module.exports = new Pool({
  connectionString: connectionString,
});
