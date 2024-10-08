const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db'); // Import the pool connection from your database module

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    // Get the pool and attempt a simple query
    const pool = await poolPromise;
    await pool.request().query('SELECT 1'); // Simple query to check the connection

    res.status(200).json({
      status: 'OK',
      message: 'Database connection is healthy',
    });
  } catch (error) {
    console.error('Database health check failed:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Unable to connect to the database',
      error: error.message,
    });
  }
});

module.exports = router;
