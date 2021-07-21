const { Schema, model } = require('mongoose');

const deletedToDoSchema = new Schema({
    name: {
        type: String,
        unique: false
    },
    description: {
        type: String,
        required: false,
        default: 'No description available'
    },
    status: {
        type: String,
        default: 'aborted'
    },
    sunrise: {
        type: String,
        default: '1618282134'
    },
    sunset: {
        type: String,
        default: '1618333901'
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('DeletedToDo', deletedToDoSchema);