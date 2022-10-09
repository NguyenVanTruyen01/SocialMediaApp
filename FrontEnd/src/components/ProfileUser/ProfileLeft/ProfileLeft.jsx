import React from 'react'
import LogoSearch from "../../ProfileSide/LogoSearch/LogoSearch"
import FollowersCard from "../../ProfileSide/FollowersCard/FollowersCard"
import InfoCard from "./InfoCard/InfoCard"
const ProfileLeft = () => {
    return (
        <div className="ProfileLeft">
            <LogoSearch />
            <InfoCard />
            <FollowersCard />
        </div>
    )
}

export default ProfileLeft

