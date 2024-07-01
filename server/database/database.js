const mongoose = require('mongoose');
require('dotenv').config();

function connectDB(retries = 5, delay = 5000) {
    return mongoose.connect(process.env.DB_CONNECTION_STRING)
        .catch((err) => {
            console.error('Failed to connect to MongoDB', err);
            if (retries > 0) {
                console.log(`Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
                setTimeout(() => connectDB(retries - 1, delay), delay);
            } else {
                console.error('Failed to connect to MongoDB after several retries. Exiting...');
                process.exit(1);
            }
        });
}

module.exports = {
    connectDB
};