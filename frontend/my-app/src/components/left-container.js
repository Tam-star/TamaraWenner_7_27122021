import React from 'react';
import Nav from './nav';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function LeftContainer() {
    return (
        <article className='left-container'>
            <div className='profile-container'>
                <img src={maleAvatar} className='main-header__avatar' alt='Profil' />
                <p>Alexandre</p>
            </div>
            <Nav />
        </article>
    )

}