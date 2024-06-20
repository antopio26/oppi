const mongoose = require('mongoose');
require('dotenv').config();

function connectDB() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
}

// export
module.exports = {
    connectDB
};