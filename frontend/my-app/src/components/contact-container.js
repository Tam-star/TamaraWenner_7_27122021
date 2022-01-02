import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function ContactContainer() {
    return (
        <div className='contact-container'>
            <ul className='contact-list'>
                <li><img src={maleAvatar} alt='Profil de Julia'/>Julia</li>
                <li><img src={maleAvatar} alt='Profil de J-P'/>J-P</li>
                <li><img src={maleAvatar} alt='Profil de Alexis'/>Alexis</li>
                <li><img src={maleAvatar} alt='Profil de Fred'/>Fred</li>
            </ul>
        </div>
    )

}