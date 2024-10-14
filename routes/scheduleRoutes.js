const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

// Get all schedules
router.get('/schedules', async (req, res) => {
    try {
      const request = new sql.Request();
      const result = await request.query(`
        SELECT s.id, c.class_name, s.day_of_week, s.start_time, s.end_time, c.room
        FROM schedules s
        JOIN classes c ON s.class_id = c.id
      `);
  
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving schedules' });
    }
  });

// Create a new schedule
router.post('/schedules', async (req, res) => {
    const { class_id, day_of_week, start_time, end_time } = req.body;
  
    // Check if there are conflicts with existing schedules
    /* TODO: Update if we want conflict checking at the DB level
    const conflictExists = await checkForConflicts(class_id, day_of_week, start_time, end_time);
    if (conflictExists) {
    return res.status(400).json({ message: 'Scheduling conflict detected!' });
    }
    */

    try {
      const request = new sql.Request();
      request.input('class_id', sql.Int, class_id);
      request.input('day_of_week', sql.VarChar, day_of_week);
      request.input('start_time', sql.Time, start_time);
      request.input('end_time', sql.Time, end_time);
  
      const result = await request.query(`
        INSERT INTO schedules (class_id, day_of_week, start_time, end_time)
        VALUES (@class_id, @day_of_week, @start_time, @end_time)
      `);
  
      res.status(201).json({ message: 'Schedule created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating schedule' });
    }
  });

// Update a schedule
router.put('/schedules/:id', async (req, res) => {
    const { day_of_week, start_time, end_time } = req.body;
    const { id } = req.params;
  
    try {
      const request = new sql.Request();
      request.input('id', sql.Int, id);
      request.input('day_of_week', sql.VarChar, day_of_week);
      request.input('start_time', sql.Time, start_time);
      request.input('end_time', sql.Time, end_time);
  
      const result = await request.query(`
        UPDATE schedules
        SET day_of_week = @day_of_week, start_time = @start_time, end_time = @end_time
        WHERE id = @id
      `);
  
      res.status(200).json({ message: 'Schedule updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating schedule' });
    }
  });

// Delete a schedule
router.delete('/schedules/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const request = new sql.Request();
      request.input('id', sql.Int, id);
  
      const result = await request.query(`
        DELETE FROM schedules WHERE id = @id
      `);
  
      res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting schedule' });
    }
  });

  const checkForConflicts = async (class_id, day_of_week, start_time, end_time) => {
    const request = new sql.Request();
    request.input('class_id', sql.Int, class_id);
    request.input('day_of_week', sql.VarChar, day_of_week);
    request.input('start_time', sql.Time, start_time);
    request.input('end_time', sql.Time, end_time);
  
    const result = await request.query(`
      SELECT s.id, c.teacher_id, c.room
      FROM schedules s
      JOIN classes c ON s.class_id = c.id
      WHERE c.teacher_id = (SELECT teacher_id FROM classes WHERE id = @class_id)
      AND s.day_of_week = @day_of_week
      AND s.start_time <= @end_time
      AND s.end_time >= @start_time
    `);
  
    return result.recordset.length > 0;  // Returns true if there is a conflict
  };


module.exports = router;
