const mongoose = require('mongoose');
require('dotenv').config();


function connectDB() {
    return mongoose.connect(process.env.DB_CONNECTION_STRING)
}


// export
module.exports = {
    connectDB
};