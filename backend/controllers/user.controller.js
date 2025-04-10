import User from "../models/user.model.js";

export const getUsersforSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(allUsers);

    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in getUsersforSidebar controller ",error.message)
    }


}