const { Pool } = require('pg');

// Configure the PostgreSQL pool
let connection;
const connectionPool  = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test the database connection
async function createConnection () {
  try {
    connection = await connectionPool.connect();
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error)
    throw new Error("Error connecting to PostgreSQL:", error);
  }
  console.log("Connected to PostgreSQL");
  return connection;
}

function releaseConnection() {
  connection.release();
  console.log("Disconnected from PostgreSQL");
}
    
module.exports = { createConnection, releaseConnection };