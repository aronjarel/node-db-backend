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
    }
};

// Create a connection pool and export it
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => {
        console.log('Database Connection Failed: ', err)
        throw err;
    });

module.exports = {
    sql, poolPromise
};
