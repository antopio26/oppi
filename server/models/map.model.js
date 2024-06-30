const mongoose = require('mongoose');
const {Project} = require('./project.model');

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
    // Size/dimensions of the map (x,y,z) >= 0
    size: {
        type: [Number],
        validate: {
            validator: function(v) {
                return v.length === 3 && v.every(n => n >= 0);
            },
            message: props => `${props.value} is not a valid size!`
        },
        default: [0, 0, 0]
    },
    offset: {
        type: [Number],
        validate: {
            validator: function(v) {
                return v.length === 3;
            },
            message: props => `${props.value} is not a valid offset!`
        },
        default: [0, 0, 0]
    }
});

MapSchema.index({name: 1, user: 1}, {unique: true});

MapSchema.pre('find', function(next) {
     if (this._conditions.user) {
         next();
     } else {
         next(new Error('User ID is not provided'));
     }
});

MapSchema.pre('remove', function(next) {
    Project.deleteMany({ map: this._id }, next);
});

const Map = mongoose.model('Map', MapSchema);

module.exports = {
    Map,
    MapSchema
}