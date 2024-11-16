import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
})

const model = mongoose.model('user-data',User)
export default model;