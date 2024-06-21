const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const { errorHandler, DBError} = require('./middleware/error.middleware');
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

const { connectDB } = require("./database/database");

let isConnected = false;
connectDB().then(() => isConnected = true).catch(console.error);

// Import API routes
const userRoutes = require('./routes/user.router');
const mapRoutes = require('./routes/map.router');
const projectRoutes = require('./routes/project.router');
const mongoose = require("mongoose");

// Middleware to check if the database is connected
app.use("/api", (req, res, next) => {
    if (isConnected) {
        next();
    } else {
        next(new DBError("Database connection failed"));
    }
});

// Use API routes
app.use("/api/user", authGuard, userRoutes);
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