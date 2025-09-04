import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    image: {
        png: {
            type: String,
            required: true
        },
        webp: {
            type: String,
            required: true
        }
    }
})

const User = new mongoose.Model('User', userSchema)

export default User