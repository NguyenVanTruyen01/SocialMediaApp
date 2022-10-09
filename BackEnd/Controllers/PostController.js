const { StatusCodes } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const Posts = require('../Models/postModel');
const Users = require('../Models/userModel');

const createPost = async (req, res) => {
    try {
        const post = await Posts.create({ ...req.body });
        return res.status(StatusCodes.CREATED).json(post);
    } catch (error) {
        return res.status(StatusCodes.BAD_GATEWAY).json({ message: error.message })
    }
}

const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Posts.findById(id);
        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: `Do not post with id ${id}` });
        }
        return res.status(StatusCodes.OK).json(post)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    if (!postId || !userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid request ' })
    }
    else {
        try {
            const post = await Posts.findById(postId);

            if (post.userId === userId) {
                await post.updateOne({ $set: req.body }, { new: true, runValidators: true });
                res.status(StatusCodes.OK).json({ message: 'Post updated!' });
            }
            else {
                return res.status(StatusCodes.FORBIDDEN).json({ message: 'Action forbidden' })
            }
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
        }
    }

}

const deleteUser = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await Posts.findById(postId);
        if (post.userId === userId) {
            await post.deleteOne();
            return res.status(StatusCodes.OK).json({ message: "Post deleted succesfully" });
        }
        else {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Action forbidden' })
        }
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }

}

// like/dislike post
const likePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await Posts.findById(postId);

        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            return res.status(StatusCodes.OK).json({ message: "Post liked!" })
        }
        else {
            await post.updateOne({ $pull: { likes: userId } });
            return res.status(StatusCodes.OK).json({ message: "Post unliked!" })
        }
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

// get time line post : la tap hop cac bai post cua user va nhung nguoi user da theo doi
const getTimeLinePostUSer = async (req, res) => {
    const userId = req.params.id;

    try {
        const currentUserPost = await Posts.find({ userId: userId });
        const followingPost = await Users.aggregate([
            {
                // Tim user co _id = userId trong bang Users 
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                // ket hop voi bang Posts voi dieu kien
                // cac bai post cos userId trung voi id trong danh sach theo doi
                $lookup: {
                    from: "posts",
                    localField: "following", //cua bang USers
                    foreignField: "userId", // cua bang Posts
                    as: "followingPosts"
                }
            },
            // tong hop
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])
        res.status(StatusCodes.OK)
            .json(
                currentUserPost.concat(...followingPost[0].followingPosts)
                    .sort((a, b) => {
                        return b.createdAt - a.createdAt;
                    })
            );

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json({ message: error.message })
    }
}


module.exports = { createPost, getPost, updatePost, deleteUser, likePost, getTimeLinePostUSer }