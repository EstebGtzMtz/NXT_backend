const { Schema, model } = require('mongoose');

const toDoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        default: 'No description available'
    },
    status: {
        type: String,
        enum: ['toDo', 'completed', 'aborted'],
        default: 'toDo'
    },
    sunrise: {
        type: String,
        default: '1618282134'
    },
    sunset: {
        type: String,
        default: '1618333901'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('ToDo', toDoSchema);