import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function ProfileContainer() {
    return (
        <section className='profile-container'>
            <img src={maleAvatar} className='profile-picture' alt='Profil' />
            <div>
                <p>Nom :</p>
                <p>Prénom :</p>
                <p>Pseudo :</p>
                <p>Email :</p>
                <p>Bio :</p>
            </div>
        </section>
    )
}