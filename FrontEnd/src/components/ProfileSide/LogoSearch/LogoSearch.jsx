import React from 'react'
import './LogoSearch.scss'
import Logo from '../../../img/logo.png'
import { UilSearch } from '@iconscout/react-unicons'
const LogoSearch = () => {
    return (
        <div className="LogoSearch">
            <img src={Logo} alt='Logo' />
            <div className="Search">
                <input type="text" placeholder='#Search'></input>
                <div className="search-icon">
                    <UilSearch />
                </div>
            </div>
        </div>
    )
}

export default LogoSearch