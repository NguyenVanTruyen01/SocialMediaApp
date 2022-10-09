import React from 'react'

import ProfileCard from "../../ProfileSide/ProfileCard/ProfileCard"
import ListPost from "../../PostSide/Posts/ListPost"
import PostShare from "../../PostSide/PostShare/PostShare"

const ProfileCenter = () => {
    return (
        <div style={{ height: "100vh", overflow: "auto" }}>
            <ProfileCard location={"profilePage"} />
            <PostShare />
            <ListPost />
        </div>
    )
}

export default ProfileCenter
