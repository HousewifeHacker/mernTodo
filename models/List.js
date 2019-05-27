const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        default: 'To Do'
    },
    tasks: [
        {
            type: Schema.ObjectId,
            ref: 'task'
        }
    ]
});

module.exports = List = mongoose.model('list', ListSchema);
