const mongoose = require('mongoose');
const { Parameters } = require("./parameters.model");

const PointSchema = new mongoose.Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    z: {
        type: Number,
        required: true
    }
}, { _id: false });

const PathSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    cost: {
        type: Number
    },
    waypoints: [
        {
            id: {
                type: Number,
                required: true
            },
            coords: PointSchema,
            _id: false
        }
    ],
    waypointsColor: [
        {
            id: {
                type: Number,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            _id: false
        }
    ],
    // smoothPath: [PointSchema]
});

// block the same path (waypoint by waypoint) from being saved multiple times
PathSchema.pre('save', async function(next) {
    try {
        const count = await this.model('Path').countDocuments({ waypoints: { $all: this.waypoints } });
        if (count > 0) {
            const err = new Error('Duplicate path');
            err.status = 208;
            next(err);
        }
        next();
    } catch (err) {
        next(err);
    }
});


PathSchema.post('save', async function(doc, next) {
    try {
        const count = await this.model('Path').countDocuments({ saved: false });
        if (count > 100) {
            const docs = await this.model('Path').find({ saved: false }).sort({ createdAt: 1 }).limit(count - 100);
            const removePromises = docs.map(doc => doc.remove());
            await Promise.all(removePromises);
        }
        next();
    } catch (err) {
        next(err);
    }
});

const Path = mongoose.model('Path', PathSchema);

module.exports = {
    Path,
    PathSchema
};
