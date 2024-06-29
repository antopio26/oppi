const mongoose = require('mongoose');

const ParametersSchema = new mongoose.Schema({
    threshold : {
        type: Number,
        default: 2.5
    },
    stepLength : {
        type: Number,
        default: 1.0
    },
    stayAway : {
        type: Number,
        default: 0.6
    },
    bias : {
        type: Number,
        default: 0.2
    },
    MAX_OPTIMIZING_ITERATIONS : {
        type: Number,
        default: 0
    }
});

const Parameters = mongoose.model('Parameters', ParametersSchema);

module.exports = {
    Parameters,
    ParametersSchema
}