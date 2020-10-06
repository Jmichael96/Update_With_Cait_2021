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
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    authorName: {
        type: String,
    },
    time: {
        type: String,
    },
    like_number: {
        type: Number
    },
    comments: [
        {
            authorName: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

const Saved = mongoose.model('Saved', SavedSchema);
module.exports = Saved;