const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    auth0Id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

exports = {
    User,
    UserSchema
}