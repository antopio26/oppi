const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const { errorHandler } = require('./middleware/error.middleware');
const { notFoundHandler } = require('./middleware/not-found.middleware');
const { authGuard } = require('./middleware/auth.middleware')

// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();
const port = process.env.PORT || 80;

// Enable CORS
app.use(cors());

// Serve frontend static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const {connectDB} = require("./database/database");
connectDB();

// Import API routes
const userRoutes = require('./routes/user.router');
const mapRoutes = require('./routes/map.router');
const projectRoutes = require('./routes/project.router')

// Use API routes
app.use("/api/users", authGuard, userRoutes);
app.use("/api/projects", authGuard, projectRoutes);
app.use("/api/maps", authGuard, mapRoutes);

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