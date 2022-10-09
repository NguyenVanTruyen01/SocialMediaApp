const Users = require('../Models/userModel')
const { StatusCodes } = require('http-status-codes');


//get a user
const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await Users.findById(id);
        if (user) {
            return res.status(StatusCodes.OK).json(user.hiddenPassword());
        }
        else
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" })
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json(error.message);
    }
}

const getAllUser = async (req, res) => {
    try {
        let users = await Users.find();
        users = users.map((user) => {
            return user.hiddenPassword();
        })
        return res.status(StatusCodes.OK).json(users);

    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json(error.message);
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { _id, isAdmin } = req.body;
    if (id === _id || isAdmin) {
        try {
            const user = await Users.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(StatusCodes.OK).json({ user: user.hiddenPassword(), token: user.createJWT() });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    }
    else {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "Action forbidden!" });
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    const { _id, currentUserAdminStatus } = req.body;
    if (id === _id || currentUserAdminStatus) {
        try {
            await Users.findByIdAndDelete(id);
            return res.status(StatusCodes.OK).json({ message: "User deleted successfully" })
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
        }
    }
}

const followUser = async (req, res) => {
    const id = req.params.id;

    const { _id } = req.body;

    if (id === _id) { //Khong duoc theo doi chinh minh
        res.status(StatusCodes.FORBIDDEN).json({ message: "Action forbidden" })
    }
    else {
        try {
            const followUser = await Users.findById(id); // Nguoi duoc theo doi
            const followingUser = await Users.findById(_id); //Nguoi dang nhan nut theo doi nguoi khac


            if (!followingUser.following.includes(id)) {// Chua theo doi

                await followUser.updateOne({ $push: { followers: _id } });
                await followingUser.updateOne({ $push: { following: id } });

                return res.status(StatusCodes.OK).json({ message: "User followed!" })
            }
            else {
                await followUser.updateOne({ $pull: { followers: _id } });
                await followingUser.updateOne({ $pull: { following: id } });

                return res.status(StatusCodes.OK).json({ message: "User unfollowed!" })
                // return res.status(StatusCodes.FORBIDDEN).json({ message: "User has been followed by you!" })
            }

        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
        }
    }
}

const unFollowUser = async (req, res) => {
    const id = req.params.id;

    const { _id } = req.body;

    if (id === _id) { //Khong duoc bo theo doi chinh minh
        res.status(StatusCodes.FORBIDDEN).json({ message: "Action forbidden" })
    }
    else {
        try {
            const followUser = await Users.findById(id); // Nguoi duoc theo doi
            const followingUser = await Users.findById(_id); //Nguoi dang nhan nut theo doi nguoi khac

            if (followingUser.following.includes(id)) {// Chua theo doi

                await followUser.updateOne({ $pull: { followers: _id } });
                await followingUser.updateOne({ $pull: { following: id } });

                return res.status(StatusCodes.OK).json({ message: "User unfollowed!" })
            }
            else {
                return res.status(StatusCodes.FORBIDDEN).json({ message: "User is not followed by you!" })
            }

        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
        }
    }
}




module.exports = { getUser, getAllUser, updateUser, deleteUser, followUser, unFollowUser }