import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function NewPost() {
    return (
        <div className='new-post'>
            <img src={maleAvatar} className='main-header__avatar' alt='Profil' />
            <p>Votre nouveau post</p>
            <button>Post it!</button>
        </div>
    )

}