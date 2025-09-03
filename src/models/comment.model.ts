import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    replies: {
        type: Array<string>,
        required: true
    }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

export default Comment