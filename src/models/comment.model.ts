import mongoose, { Schema, SchemaType } from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Reply',
        required: true
    }]
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

export default Comment