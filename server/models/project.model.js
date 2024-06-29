const mongoose = require('mongoose');
const { Parameters } = require('./parameters.model');

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
        default: Date.now
    },
    thumbnail: {
        type: String
    },
    lastOpenAt: {
        type: Date,
        default: Date.now
    },
    map: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Map',
        required: true
    },
    parameters: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parameters'
    }
})

ProjectSchema.index({name: 1, user: 1}, {unique: true});

// Middleware to filter projects by userId
ProjectSchema.pre('find', function(next) {
    if (this._conditions.user) {
        next();
    } else {
        next(new Error('User ID is not provided'));
    }
});

ProjectSchema.pre('save', function (next){
    if (!this.parameters){
        Parameters.create({}).then(parameters => {
            this.parameters = parameters._id;
            next();
        }).catch(err => next(err));
    } else {
        next();
    }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
    Project,
    ProjectSchema
}