// db.js
const sql = require('mssql');
require('dotenv').config();

// MSSQL configuration using environment variables
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, 
    database: process.env.DB_DATABASE,
    port: 1433,
    options: {
        encrypt: true, // Enable encryption for Azure SQL
        trustServerCertificate: true // For development (disable SSL validation)
    },
    pool: {
        max: 10,
        min: 0, 
        idleTimeoutMillis: 30000
    }
};

// Retry mechanism: attempt to reconnect if the initial connection fails
async function createConnectionPool() {
    let retries = 5; // Number of retries
    while (retries) {
      try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to SQL Database');
        return pool;
      } catch (error) {
        console.error('Database connection failed. Retrying...', error);
        retries -= 1;
        if (retries === 0) {
          throw new Error('Max retries reached. Unable to connect to the database');
        }
        await new Promise((res) => setTimeout(res, 5000)); // Wait 5 seconds before retrying
      }
    }
  }

// Create a connection pool and export it
const poolPromise = createConnectionPool();

module.exports = {
    sql, poolPromise
};
