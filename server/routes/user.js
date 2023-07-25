import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js";
import { verifyToken , verifyTokenAndAuth } from "../middlewares/verifyToken.js";


const router = express.Router();

// get
router.get("/:id", verifyToken, getUser);

router.get("/:id/friends", verifyToken, getUserFriends)

// update

router.patch("/:id/:friendId", verifyTokenAndAuth, addRemoveFriend)


export default router;