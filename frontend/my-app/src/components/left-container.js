import React from 'react';
import Nav from './nav';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function LeftContainer({ connected, changeCenterContainer }) {
    return (
        <section className='left-container'>
            {connected ?
                <div className='profile-container'>
                    <img src={maleAvatar} alt='Profil' />
                    <p>Alexandre</p>
                </div> 
                : ''}
            <Nav connected={connected} handleClick={changeCenterContainer} />
        </section>
    )

}