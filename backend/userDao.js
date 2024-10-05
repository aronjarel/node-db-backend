// userDAO.js
const { sql, poolPromise } = require('./db');
const bcrypt = require('bcrypt');

// Create a new user
async function createUser(email, password, role) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, hashedPassword)
      .input('role', sql.VarChar, role)
      .query(`INSERT INTO Users (Email, Password, Role) VALUES (@email, @password, @role)`);
    return true;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
}

// Find user by email
async function findUserByEmail(email) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query(`SELECT * FROM Users WHERE Email = @email`);
    return result.recordset[0];
  } catch (error) {
    throw new Error('Error finding user: ' + error.message);
  }
}

module.exports = {
  createUser,
  findUserByEmail,
};
