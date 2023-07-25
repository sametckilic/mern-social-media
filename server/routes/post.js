import express from "express";

import { verifyToken ,verifyTokenAndAuth } from "../middlewares/verifyToken.js";

import { createPost, getAllPosts, getUserPosts, likePost } from "../controllers/posts.js";

const router = express.Router();

// get

router.get("/feed", verifyToken, getAllPosts);
router.get("/:userId", verifyToken, getUserPosts);


// post

router.post("/createpost", verifyTokenAndAuth, createPost)

// updated

router.patch("/:id/like", verifyTokenAndAuth, likePost);

export default router;