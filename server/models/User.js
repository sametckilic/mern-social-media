import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 25
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 25
    },
    email:{
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        required:true
    },
    pictureBase: {
        type: String,
        default: ""
    },
    coverPictureBase:{
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        defult: []
    },
    location: Object,
    viewedProfile: {
        type: Number,
        default: 0
    },
    

},{timestamps: true})

const User = mongoose.model("User", UserSchema);

export default User;