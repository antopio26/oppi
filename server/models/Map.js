const mongoose = require('mongoose');
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
        required: true,
        default: Date.now
    },
    // Size/dimensions of the map (x,y,z) >= 0
    size: {
        type: [Number],
        required: true,
        validate: {
            validator: function(v) {
                return v.length === 3 && v.every(n => n >= 0);
            },
            message: props => `${props.value} is not a valid size!`
        }
    },
    offset: {
        type: [Number],
        required: true,
        validate: {
            validator: function(v) {
                return v.length === 3;
            },
            message: props => `${props.value} is not a valid offset!`
        }
    }
});

const Map = mongoose.model('Map', MapSchema);

module.exports = {
    Map,
    MapSchema
}