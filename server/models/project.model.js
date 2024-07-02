const mongoose = require('mongoose');
const { Parameters } = require('./parameters.model');
const { Path } = require('./path.model');

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
    nPaths: {
        type: Number,
        default: 0
    },
    nNodes: {
        type: Number,
        default: 0
    },
    totalLength: {
        type: Number,
        default: 0
    },
    nSavedPaths: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    thumbnail: String,
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
});

ProjectSchema.index({ name: 1, user: 1 }, { unique: true });

ProjectSchema.pre('find', function(next) {
    return this._conditions.user ? next() : next(new Error('User ID is not provided'));
});

ProjectSchema.pre('save', function(next) {
    if (!this.parameters) {
        Parameters.create({})
            .then(parameters => {
                this.parameters = parameters._id;
                next();
            })
            .catch(next);
    } else {
        next();
    }
});

const deleteRelated = async function(next) {
    try {
        const projectId = this._conditions?._id || this._id;

        await Parameters.deleteOne({ _id: projectId });
        await Path.deleteMany({ project: projectId });

        next();
    } catch (err) {
        next(err);
    }
};

ProjectSchema.pre('deleteOne', { document: false, query: true }, deleteRelated);
ProjectSchema.pre('deleteOne', { document: true, query: false }, deleteRelated);
ProjectSchema.pre('findOneAndDelete', deleteRelated);

ProjectSchema.pre('deleteMany', async function(next) {
    try {
        const projectIds = this._conditions._id;

        await Parameters.deleteMany({ _id: { $in: projectIds } });
        await Path.deleteMany({ project: { $in: projectIds } });

        next();
    } catch (err) {
        next(err);
    }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = { Project, ProjectSchema };
