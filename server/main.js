const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
const { errorHandler } = require('./middleware/error.middleware');
const { notFoundHandler } = require('./middleware/not-found.middleware');


// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();
const port = process.env.PORT || 80;

// Enable CORS
app.use(cors());

const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    tokenSigningAlg: 'RS256'
});

// Serve frontend static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import API routes
const userRoutes = require('./routes/user.router');
const mapRoutes = require('./routes/map.router');

// Use JWT middleware for API routes
// app.use("/api/", jwtCheck);

// Use API routes
app.use("/api/users", jwtCheck, userRoutes);
app.use("/api/maps", jwtCheck, mapRoutes);

// Handle 404 errors
app.use("/api/", notFoundHandler);

// Catch-all route to serve index.html for React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log('Server is running on port ', port);
});
