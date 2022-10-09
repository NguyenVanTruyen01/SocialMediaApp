import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './User.scss'
import { followUser, unfollowUser } from '../../actions/UserAction.js'


const User = ({ person, id }) => {
    const dispatch = useDispatch();

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData);
    const [follow, setFollow] = useState(person.followers.includes(user._id))

    const handleFollow = (e) => {
        e.preventDefault();
        try {
            if (follow) {
                dispatch(unfollowUser(person._id, user))
            }
            else {
                dispatch(followUser(person._id, user))
            }

            setFollow((prev) => !prev)

        } catch (err) {
            console(err)
        }

    }
    return (
        <div className='follower' key={id}>
            <div>
                <img src={
                    person.profilePicture ? serverPublic + person.profilePicture : serverPublic + 'defaultProfile.png'
                } alt='image follower' className='folowerImg' />

                <div className='name'>
                    <span>{person.firstName}&nbsp;{person.lastName}</span>
                    <span>@{person.lastName}</span>
                </div>
            </div>
            <button className='btn fc-btn'
                style={{
                    background: follow ? "var(--buttonBg)" : "transparent",
                    color: follow ? "white" : "orange"
                }}
                onClick={handleFollow}>
                {follow ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}

export default User
