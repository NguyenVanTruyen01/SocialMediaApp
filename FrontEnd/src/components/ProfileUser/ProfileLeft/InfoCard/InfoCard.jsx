


import React from 'react'
import "./InfoCard.scss"
import * as UserApi from '../../../../api/UserRequets.js'
import { logOut } from "../../../../actions/AuthAction.js"

import { UilPen } from "@iconscout/react-unicons"
import { UilComment } from "@iconscout/react-unicons"
import { UisHouseUser } from '@iconscout/react-unicons-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingUser } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileModal from '../../../Modal/ProfileModal/ProfileModal'
import { useEffect } from 'react'

const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();

    // lay id cua user can xem profile
    const profileUserId = params.id;
    // lay user dang login web
    const { user } = useSelector((state) => state.authReducer.authData);

    // set thong tin cho profile
    const [profileUser, setProfileUser] = useState(user);

    console.log('------------------');
    console.log(user)

    const fetchProfileUser = async (profileUserId, user_id) => {
        if (profileUserId === user_id) { // xem thông tin của chính mình
            const my = await UserApi.getUser(user_id);
            setProfileUser(my.data);
        }
        else {
            const profileUser = await UserApi.getUser(profileUserId);
            setProfileUser(profileUser.data)
        }
    };

    //lay thong tin user o database va hien thi
    useEffect(() => {
        try {
            fetchProfileUser(profileUserId, user._id);
        } catch (error) {
            console.log(error)
        }

    }, [modalOpened, user])

    const handleLogout = () => {
        dispatch(logOut())
    }

    return (
        <div className="Infocard">
            <div className="infoHead">
                <h4>Your Infomation</h4>

                {
                    profileUserId === user._id ? (<div>
                        <UilPen onClick={() => {

                            setModalOpened(true)
                        }} />
                        <ProfileModal
                            modalOpened={modalOpened}
                            setModalOpened={setModalOpened}
                            user={profileUser} />
                    </div>)
                        : ""
                }
            </div>

            <div className="info">

                <span>
                    <UilComment className="svg-status" />
                    <b>Status</b>
                </span>
                <span>{profileUser.relationship}</span>
            </div>

            <div className="info">
                <span>
                    <UisHouseUser className="svg-liveIn" />
                    <b>Live in</b>
                </span>
                <span>{profileUser.livesIn}</span>
            </div>

            <div className="info">
                <span>
                    <FontAwesomeIcon icon={faBuildingUser} className="svg-workAt" />
                    <b>Work at</b>
                </span>
                <span>{profileUser.worksAt}</span>
            </div>

            <button className='btn btn-logout'
                onClick={handleLogout}> Log out</button>
        </div>
    )
}

export default InfoCard
