const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

// Add a new attendance record
router.post('/', async (req, res) => {
  const { userId, courseId, date, status, notes } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('UserId', userId)
      .input('CourseId', courseId)
      .input('Date', date)
      .input('Status', status)
      .input('Notes', notes)
      .query(`
        INSERT INTO Attendance (UserId, CourseId, Date, Status, Notes)
        VALUES (@UserId, @CourseId, @Date, @Status, @Notes)
      `);
    res.status(201).json({ message: 'Attendance recorded successfully' });
  } catch (error) {
    console.error('Error adding attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance records (optional filters for user, course, or date)
router.get('/', async (req, res) => {
  const { userId, courseId, date } = req.query;
  try {
    const pool = await poolPromise;
    let query = 'SELECT * FROM Attendance WHERE 1=1';
    if (userId) query += ` AND UserId = ${userId}`;
    if (courseId) query += ` AND CourseId = ${courseId}`;
    if (date) query += ` AND Date = '${date}'`;
    const result = await pool.request().query(query);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an existing attendance record
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Id', id)
      .input('Status', status)
      .input('Notes', notes)
      .query(`
        UPDATE Attendance SET Status = @Status, Notes = @Notes
        WHERE Id = @Id
      `);
    res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an attendance record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request().input('Id', id).query('DELETE FROM Attendance WHERE Id = @Id');
    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
