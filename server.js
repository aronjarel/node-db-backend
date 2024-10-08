// server.js
const express = require('express');
const cors = require('cors');  // Import cors middleware
const helmet = require('helmet');
const authRoutes = require('./authRoutes');
const courseRoutes = require('./courseRoutes');
const healthCheck = require('./routes/healthCheck'); // Import the health check route


require('dotenv').config();


const app = express();
app.use(express.json());

const dashboardRoutes = require('./dashboardRoutes');


// Enable CORS for all routes and origins
// Replace localhost with your frontend's domain in production
const corsOptions = {
  origin: ['http://localhost:3000', 'https://proud-mud-01a955410.5.azurestaticapps.net', '*'], // Multiple allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow credentials (if needed)
};

app.use(cors(corsOptions));
// Manually handle the preflight `OPTIONS` request for all routes
app.options('*', cors(corsOptions)); // Preflight request handler for all routes
/*
// Set CSP header with data URL allowance
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self' *"],            // Default directive allows resources from the same origin
        imgSrc: ["'self'", "data:"],       // Allow images from same origin and data URLs
        scriptSrc: ["'self'", "'unsafe-inline'"], // Allow scripts from same origin
        styleSrc: ["'self'", "'unsafe-inline'"],  // Allow styles from same origin
        connectSrc: ["'self'", "*"], // Allow API calls
        fontSrc: ["'self'", "data:"],      // Allow fonts from same origin and data URLs
      },
    })
  );

*/

//set the security header DEVELOPMENT ONLY
/*
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    return next();
});
*/

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);
// Add the new /api/hello route (without authentication)
app.use('/api', healthCheck);
app.get('/api/hello', (req, res) => {
  res.send('Hello');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
