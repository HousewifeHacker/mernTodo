const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    name: {
        type: String,
        default: 'To Do'
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'task'
        }
    ]
});

module.exports = List = mongoose.model('list', ListSchema);
