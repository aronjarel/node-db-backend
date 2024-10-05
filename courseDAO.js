// courseDAO.js
const { sql, poolPromise } = require('./db');

// Create a new course
async function createCourse(name, description, teacherId) {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('name', sql.VarChar, name)
      .input('description', sql.Text, description)
      .input('teacherId', sql.Int, teacherId)
      .query(`INSERT INTO Courses (Name, Description, TeacherId) VALUES (@name, @description, @teacherId)`);
  } catch (error) {
    throw new Error('Error creating course: ' + error.message);
  }
}

// Get all courses
async function getCourses() {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT * FROM Courses`);
    return result.recordset;
  } catch (error) {
    throw new Error('Error retrieving courses: ' + error.message);
  }
}

// Update a course
async function updateCourse(id, name, description) {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.VarChar, name)
      .input('description', sql.Text, description)
      .query(`UPDATE Courses SET Name = @name, Description = @description WHERE Id = @id`);
  } catch (error) {
    throw new Error('Error updating course: ' + error.message);
  }
}

// Delete a course
async function deleteCourse(id) {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query(`DELETE FROM Courses WHERE Id = @id`);
  } catch (error) {
    throw new Error('Error deleting course: ' + error.message);
  }
}

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
};
