const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    nickname: {
        type: String,
        default: function() {
            return this.name;
        }
    },
    theme: {
        type: String,
        default: 'lemon'
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    UserSchema
}