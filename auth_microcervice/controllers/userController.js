import User from "../schema/userModel.js";

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select("id userName email");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Something went wrong, try again later", error });
    }
};

const getAllUsers = async (req, res) =>{
    const {userIds} = req.body;
    try{
        const users = await User.find({ _id: { $in: userIds } }).select("id userName email");
        return res.json({ users });
    }
    catch(error){
        console.error("Error fetching all users:", error);
        return res.status(500).json({ message: "Something went wrong, try again later", error });
    }

}

export  {getUser , getAllUsers};
