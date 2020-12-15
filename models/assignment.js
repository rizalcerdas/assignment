const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    expired: {
        type: String,
        required: true
    },
    files: {
        type: String,
    }
}, {timestamp: true})
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;