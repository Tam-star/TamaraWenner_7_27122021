import React from 'react';
import Nav from './nav';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function LeftContainer() {
    return (
        <section className='left-container'>
            <div className='profile-container'>
                <img src={maleAvatar} alt='Profil' />
                <p>Alexandre</p>
            </div>
            <Nav />
        </section>
    )

}