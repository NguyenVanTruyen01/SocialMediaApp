import React from 'react'
import './RightSide.scss'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import TrendCard from './TrendCard/TrendCard'
import { Link } from 'react-router-dom'
const RightSide = () => {
    return (

        <div className="RightSide">
            <div className="navIcons">
                <Link to={'/home'}>
                    <img src={Home} />
                </Link>

                <Link to={'#'}>
                    <img src={Noti} />
                </Link>

                <Link to={'#'}>
                    <img src={Comment} />
                </Link>

                <Link to={'#'}>
                    <UilSetting />
                </Link>

            </div >

            <TrendCard />
        </div >
    )
}

export default RightSide
