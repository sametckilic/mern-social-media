import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    location: Object,
    description: String,
    pictureBase: Array,
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: Object,

});



const Post = mongoose.model("Post", PostSchema);

export default Post;