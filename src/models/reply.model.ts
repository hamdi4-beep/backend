import mongoose, { Schema } from "mongoose";

const replySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    replyingTo: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

const Reply = mongoose.model('Reply', replySchema)

export default Reply