const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// For now, allow just not done and done status
// TODO add more status integers
const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        min: [0, 'Status not recognized'],
        max: [1],
        default: 0
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List',
        required: true
    }
});

module.exports = Task = mongoose.model('task', TaskSchema);
