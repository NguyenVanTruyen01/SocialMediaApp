import React from 'react'
import ProfileLeft from "../../components/ProfileUser/ProfileLeft/ProfileLeft"
import ProfileCenter from '../../components/ProfileUser/ProfileCenter/ProfileCenter'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.scss'

const Profile = () => {
    return (
        <div className='ProfilePage'>
            <ProfileLeft />
            <ProfileCenter />
            <RightSide />
        </div>
    )
}

export default Profile