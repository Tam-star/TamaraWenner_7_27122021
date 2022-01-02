import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function Header() {
    return (
        <header className='main-header'>
            {/* <img src={logo} className='main-header__logo' /> */}
            <div className='main-header__logo'></div>
            <div className='main-header__right-container'>
                <form className='main-header__form'>
                    <input></input>
                </form>
                <img src={maleAvatar} className='main-header__avatar' alt='Profil'/>
            </div>
        </header>
    )

}