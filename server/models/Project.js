const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastOpenAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    map: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Map',
        required: true
    },
    parameters: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parameters',
        required: true
    }
})

// Middleware to filter projects by userId
ProjectSchema.pre('find', function(next) {
    if (this._conditions.user) {
        next();
    } else {
        next(new Error('User ID is not provided'));
    }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
    Project,
    ProjectSchema
}