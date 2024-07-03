const mongoose = require('mongoose');

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
}, {_id: false});

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
    smoothPath: [PointSchema]
});

// block the same path (waypoint by waypoint) from being saved multiple times
PathSchema.pre('save', async function (next) {
    try {
        const path = await this.model('Path').findOne({project: this.project, waypoints: {$all: this.waypoints, $size: this.waypoints.length}});
        if (path) {
            const err = new Error('Duplicate path');
            err.status = 208;
            err.path = path;
            next(err);
        }
        next();
    } catch (err) {
        next(err);
    }
});


PathSchema.post('save', async function (doc, next) {
    try {
        const count = await this.model('Path').countDocuments({project: doc.project, saved: false});
        if (count > 100) {
            const docs = await this.model('Path').find({saved: false}).sort({createdAt: 1}).limit(count - 100);
            const removePromises = docs.map(doc => doc.remove());
            await Promise.all(removePromises);
        }

        // Update the project's nNodes nPaths nSavedPaths totalLength
        const project = await this.model('Project').findById(doc.project);

        project.nNodes += doc.waypoints.length;
        project.nPaths += 1;
        project.totalLength += parseFloat(doc.cost) || 0;
        project.nSavedPaths += doc.saved ? 1 : 0;

        await project.save();

        next();
    } catch (err) {
        next(err);
    }
});

PathSchema.post('deleteOne', {query: true, document: false}, async function (doc, next) {
    try {
        const project = await this.model('Project').findById(doc.project);
        project.nNodes -= doc.waypoints.length;
        project.nPaths -= 1;
        project.totalLength -= parseFloat(doc.cost) || 0;
        project.nSavedPaths -= doc.saved ? 1 : 0;
        await project.save();
        next();
    } catch (err) {
        next(err);
    }
});

PathSchema.post('deleteOne', {query: false, document: true}, async function (query, next) {
    try {
        const project = await this.model('Project').findById(query.project);
        project.nNodes -= query.waypoints.length;
        project.nPaths -= 1;
        project.totalLength -= parseFloat(query.cost) || 0;
        project.nSavedPaths -= query.saved ? 1 : 0;
        await project.save();
        next();
    } catch (err) {
        next(err);
    }
});

PathSchema.post('findOneAndUpdate', async function (query, next) {
    try {
        let project = mongoose.model('Project');
        project = await project.findById(query.project);
        project.nSavedPaths += query.saved ? 1 : -1;
        await project.save();
        next();
    } catch (err) {
        next(err);
    }
});

PathSchema.post('findOneAndDelete', async function (query, next) {
    try {
        const project = await this.model('Project').findById(query.project)
        project.nNodes -= query.waypoints.length;
        project.nPaths -= 1;
        project.totalLength -= parseFloat(query.cost) || 0;
        project.nSavedPaths -= query.saved ? 1 : 0;
        await project.save();
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
