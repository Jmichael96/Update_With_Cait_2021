const mongoose = require('mongoose');

const SubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});
const Sub = mongoose.model('Sub', SubSchema);
module.exports = Sub;