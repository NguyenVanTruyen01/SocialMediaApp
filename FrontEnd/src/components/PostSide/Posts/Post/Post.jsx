import React from 'react'
import "./Post.scss"
import Comment from '../../../../img/comment.png'
import Share from '../../../../img/share.png'
import Heart from '../../../../img/like.png'
import NotLike from '../../../../img/notlike.png'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { likePost } from '../../../../api/PostRequest'

import { useDispatch } from 'react-redux'
import { getTimeLinePosts } from '../../../../actions/PostAction.js'

const Post = ({ post }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);

    const [liked, setLiked] = useState(post.likes.includes(user._id));
    const [amountLikes, setAmountLikes] = useState(post.likes.length);

    const handleLike = () => {
        setLiked((prev) => !prev)
        likePost(post._id, user._id);
        setAmountLikes((prev) => liked ? prev - 1 : prev + 1)

        dispatch(getTimeLinePosts(user._id))
    }

    return (
        <div className='SinglePost'>

            <div className="userPost">
                <span><b>{post.nameUserId}</b></span>
                <span>{post.desc}</span>
            </div>

            <img src={post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ""}
                alt="image post" />

            <span>{amountLikes} likes</span>
            <div className="postReact">
                <img src={liked ? Heart : NotLike}
                    alt="image like"
                    onClick={handleLike}
                />
                <img src={Comment} alt="image comment" />
                <img src={Share} alt="image share" />
            </div>
        </div>
    )
}

export default Post
