const mongoose = require('mongoose');
require('dotenv').config();

function connectDB(retries = 10, delay = 5000) {
    return mongoose.connect(process.env.DB_CONNECTION_STRING)
        .catch((err) => {
            console.error('Failed to connect to MongoDB', err);
            if (retries > 0) {
                console.log(`Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        connectDB(retries - 1, delay).then(resolve, reject);
                    }, delay);
                })
            } else {
                console.error('Failed to connect to MongoDB after several retries. Exiting...');
                process.exit(1);
            }
        });
}

module.exports = {
    connectDB
};