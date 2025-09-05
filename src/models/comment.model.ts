import mongoose, { Schema, SchemaType } from "mongoose";
import { replySchema } from "./reply.model";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    replies: [replySchema]
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

export default Comment