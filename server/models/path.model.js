const mongoose = require('mongoose');
const {Parameters} = require("./parameters.model");

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
})

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
        type: Number,
        required: true
    },
    // TODO: add more metrics here
    waypoints: [PointSchema],
    waypointsColor: [
        {
            type: String,
            required: true
        }
    ],
    smoothPath: [PointSchema]
});

PathSchema.post('save', function(doc, next) {
    this.model('Path').countDocuments({ saved: false }, (err, count) => {
        if (err) {
            next(err);
        } else if (count > 100) {
            this.model('Path').find({ saved: false }).sort({ createdAt: 1 }).limit(count - 100)
                .then(docs => {
                    const removePromises = docs.map(doc => doc.remove());
                    return Promise.all(removePromises);
                })
                .then(() => next())
                .catch(err => next(err));
        } else {
            next();
        }
    });
});

const Path = mongoose.model('Path', PathSchema);

module.exports = {
    Path,
    PathSchema
}