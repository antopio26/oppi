const mongoose = require('mongoose');
const { Project } = require('./project.model');

const MapSchema = new mongoose.Schema({
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
    size: {
        type: [Number],
        validate: {
            validator: v => v.length === 3 && v.every(n => n >= 0),
            message: props => `${props.value} is not a valid size!`
        },
        default: [0, 0, 0]
    },
    offset: {
        type: [Number],
        validate: {
            validator: v => v.length === 3,
            message: props => `${props.value} is not a valid offset!`
        },
        default: [0, 0, 0]
    }
});

MapSchema.index({ name: 1, user: 1 }, { unique: true });

const deleteProjects = async function(next) {
    const mapId = this._conditions._id || this._id;
    try {
        await Project.deleteMany({ map: Array.isArray(mapId) ? { $in: mapId } : mapId });
        next();
    } catch (err) {
        next(err);
    }
};

MapSchema.pre('find', function(next) {
    return this._conditions.user ? next() : next(new Error('User ID is not provided'));
});

MapSchema.pre('deleteOne', { document: true, query: false }, deleteProjects);
MapSchema.pre('deleteOne', { document: false, query: true }, deleteProjects);
MapSchema.pre('findOneAndDelete', deleteProjects);
MapSchema.pre('deleteMany', deleteProjects);

const Map = mongoose.model('Map', MapSchema);

module.exports = { Map, MapSchema };
