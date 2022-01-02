import React from 'react';
import logo from '../assets/icon-left-font.png';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function Header() {
    return (
        <header className='main-header'>
            <img src={logo} className='main-header__logo' />
            <form>
                <input value={'Search'}></input>
            </form>
            <img src={maleAvatar} className='main-header__avatar'/>
        </header>
    )

}