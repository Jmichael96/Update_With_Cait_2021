const mongoose = require('mongoose');

// Define collection and schema for Post
let PostSchema = new mongoose.Schema({
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

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;