import React, { useState } from 'react'
import Cover from '../../../img/cover.jpg'
import Profile from '../../../img/profileImg.jpg'
import { useSelector } from 'react-redux'
import './ProfileCard.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const ProfileCard = ({ location }) => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state) => state.postReducer.posts)
    const uploading = useSelector((state) => state.postReducer.uploading)

    const [update, setUpdate] = useState(uploading)

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        console.log('666666666666666666666666')
    }, [uploading])

    return (
        <div className='ProfileCard'>
            <div className='ProfileImages'>
                <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + 'defaultCover.jpg'} alt=''></img>
                <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + 'defaultProfile.png'} alt=''></img>
            </div>

            <div className='ProfileName'>
                <span>{user.firstName} {user.lastName}</span>
                <span>{user.about ? user.about : "Write for yourself"}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className='follow'>
                        <span>{user.following.length}</span>
                        <span>Folowers</span>
                    </div>

                    <div className="vl"></div>

                    <div className='follow'>
                        <span>{user.followers.length}</span>
                        <span>Following</span>
                    </div>

                    {location === 'profilePage' && <>
                        <div className="vl"></div>

                        <div className='follow'>
                            <span>{posts.filter((post) => post.userId === user._id).length}</span>
                            <span>Posts</span>
                        </div>
                    </>}
                </div>
                <hr />
            </div>

            {location === 'profilePage' ? "" : <span>
                <Link to={`/profile/${user._id}`}
                    style={{ color: 'orange' }}>
                    My Profile
                </Link>
            </span>}

        </div>
    )
}

export default ProfileCard