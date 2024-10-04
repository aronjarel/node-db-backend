// classDAO.js
const { sql, poolPromise } = require('./db');

// Class Data Access Object
class ClassDAO {
    // Fetch all classes from the database
    async getAllClasses() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM Classes');
            return result.recordset;
        } catch (error) {
            throw new Error('Error fetching classes: ' + error.message);
        }
    }

    // Add a new class
    async addClass(className, teacherName) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('className', sql.VarChar, className)
                .input('teacherName', sql.VarChar, teacherName)
                .query('INSERT INTO Classes (ClassName, TeacherName) VALUES (@className, @teacherName)');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw new Error('Error adding class: ' + error.message);
        }
    }

    // Assign or update a teacher for an existing class
    async assignTeacher(classId, teacherName) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('classId', sql.Int, classId)
                .input('teacherName', sql.VarChar, teacherName)
                .query('UPDATE Classes SET TeacherName = @teacherName WHERE ClassId = @classId');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw new Error('Error assigning teacher: ' + error.message);
        }
    }

    // Remove a class
    async deleteClass(classId) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('classId', sql.Int, classId)
                .query('DELETE FROM Classes WHERE ClassId = @classId');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw new Error('Error deleting class: ' + error.message);
        }
    }
}

module.exports = new ClassDAO();
