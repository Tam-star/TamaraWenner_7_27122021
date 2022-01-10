import React from 'react';
import Nav from './nav';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function LeftContainer({ connected, user }) {
    return (
        <section className='left-container'>
            {connected ?
                <aside className='profile-aside'>
                    <img src={user.imageUrl ? user.imageUrl : maleAvatar} alt='Profil' />
                    <p>Bonjour {user.pseudo} !</p>
                </aside> 
                : ''}
            <Nav connected={connected} />
        </section>
    )

}