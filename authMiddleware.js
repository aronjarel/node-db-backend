const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify token and role
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    console.log("user verified!");
    req.user = user;
    next();
  });
}

// Middleware to restrict route to certain roles
function authorizeRoles(...allowedRoles) {
  console.log('authorizing role: ', allowedRoles);
  return (req, res, next) => {
    console.log("user role:", req.user.role);
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role privileges' });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
