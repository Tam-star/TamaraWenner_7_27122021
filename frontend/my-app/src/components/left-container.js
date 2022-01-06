import React from 'react';
import Nav from './nav';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function LeftContainer({ connected, changeCenterContainer, user }) {
    return (
        <section className='left-container'>
            {connected ?
                <aside className='profile-aside'>
                    <img src={maleAvatar} alt='Profil' />
                    <p>Bonjour {user.pseudo} !</p>
                </aside> 
                : ''}
            <Nav connected={connected} handleClick={changeCenterContainer} />
        </section>
    )

}