const mongoose = require('mongoose');

// Define collection and schema for Post
let SavedSchema = new mongoose.Schema({
    title: {
        type: String
    },
    coverImage: {
        type: String,
    },
    summary: {
        type: String,
    },
    category: {
        type: String,
    },
    content: {
        type: String
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    authorName: {
        type: String,
    },
    time: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Saved = mongoose.model('Saved', SavedSchema);
module.exports = Saved;