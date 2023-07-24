import express from "express";
import { getUser, getUserFriends } from "../controllers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router = express.Router();

// get
router.get("/:id", verifyToken, getUser);

router.get("/:id/friends", verifyToken, getUserFriends)

// update

router.patch("/:id/:friendId", verifyToken, addRemoveFriend)


export default router;