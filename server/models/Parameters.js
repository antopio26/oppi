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
const Parameter = mongoose.model('Parameter', ParameterSchema);

module.exports = {
    Parameter,
    Parameters,
    ParameterSchema,
    ParametersSchema
}