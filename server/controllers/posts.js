import { request } from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';



export const createPost = async (req, res) => {
    try{    
        const { userId, description, pictureBase, location } = req.body; 

        const newPost = new Post({
            userId,
            location,
            description,
            pictureBase,
            likes: {},
            comments: {},

        })
        
        await newPost.save();

        res.status(200).json(newPost);
    }
    catch(err){
        res.status(409).json({message: err.message});
    }

};


export const getAllPosts = async (req, res) =>{
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch(err){
         res.status(404).json({message: err.message});
    }
};

export const getUserPosts = async (req, res) =>{
    try{
        const { userId } = req.params; 
        const posts = await Post.find({ userId });
        res.status(200).json(posts);
    }
    catch(err){
         res.status(404).json({message: err.message});
    }
};

export const likePost = async (req, res) => {
    try{
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked) post.likes.delete(userId);
        else post.likes.set(userId, true);

        const updatedPost = await Post.findByIdAndUpdate(id, 
            { likes: post.likes}
        );

        res.status(200).json(updatedPost);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
};