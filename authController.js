// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('./userDao');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// User registration
async function register(req, res) {
  const { email, password, role } = req.body;
  try {
    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    await createUser(email, password, role);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// User login
async function login(req, res) {
  console.log("login function running...");
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    console.log("match found: " + isMatch);
    const token = jwt.sign({ userId: user.Id, role: user.Role }, JWT_SECRET, { expiresIn: '1h' });

    console.log("token created");
    res.json({ token });
  } catch (error) {
    console.log("error on login: " + error.message);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
};
