const mongoose = require('mongoose');
const { Schema } = mongoose;


const NoteSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    }
});
const Notes = mongoose.model('Notes', NoteSchema);
module.exports = Notes;