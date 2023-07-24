import User from "../models/User.js";


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const { password,email, ...formatedUser} = user._doc;
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
            ({id, firstName, lastName, picturePath, coverPicturePath}) => {
                return {id , firstName, lastName, picturePath, coverPicturePath}}
        )

        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}