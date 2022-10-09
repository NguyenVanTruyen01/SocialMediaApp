import React from 'react'
import PostShare from "./PostShare/PostShare"
import ListPost from './Posts/ListPost'
import './PostSide.scss'


const PostSide = () => {
    return (
        <div className="PostSide">
            <PostShare />
            <ListPost />
        </div>
    )
}

export default PostSide
