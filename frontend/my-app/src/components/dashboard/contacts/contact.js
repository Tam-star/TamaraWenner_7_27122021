import React from 'react';
import maleAvatar from '../../../assets/male-avatar-profile.jpg';

export default function Contact({ pseudo, picture }) {


    return (
        <li>
            <img src={picture ? picture : maleAvatar} alt={`Profil de ${pseudo}`} />{pseudo}
        </li>
    )

}