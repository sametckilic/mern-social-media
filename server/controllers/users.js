import User from "../models/User.js";


// get

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const { password, email, ...formatedUser } = user._doc;
        res.status(200).json(formatedUser);

    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }

}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map(
                (friendsId) => User.findById(friendsId)
            ))

        const formattedFriends = friends.map(
            ({ id, firstName, lastName, picturePath, coverPicturePath }) => {
                return { id, firstName, lastName, picturePath, coverPicturePath }
            }
        )

        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// update 

export const addRemoveFriends = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
            
        }
        else{
            user.friends.push(friendId);
            user.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map(
                (friendsId) => User.findById(friendsId)
            ))

        const formattedFriends = friends.map(
            ({ id, firstName, lastName, picturePath, coverPicturePath }) => {
                return { id, firstName, lastName, picturePath, coverPicturePath }
            }
        )
        res.status(200).json(formattedFriends);
    }

    catch (err) {
        res.status(404).json({ message: err.message });
    }
}