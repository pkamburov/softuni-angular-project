const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = mongoose.Schema ({
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    comments: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
}, { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model('Comment', commentSchema);