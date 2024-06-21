const mongoose = require('mongoose');

const ParameterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const ParametersSchema = new mongoose.Schema({
    parameters: {
        type: [ParameterSchema],
        required: true
    }
});

const Parameters = mongoose.model('Parameters', ParametersSchema);

module.exports = {
    Parameters,
    ParametersSchema
}