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
});

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
            coords: PointSchema
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
            }
        }
    ],
    // smoothPath: [PointSchema]
});

PathSchema.index({ project: 1, waypoints: 1, waypointsColor: 1, smoothPath: 1 }, { unique: true});

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
