import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function NewPost() {
    return (
        <div className='new-post'>
            <img src={maleAvatar} className='profile-picture' alt='Profil' />
            <form className='new-post__form'>
                <input></input>
            </form>
            <button>Post it!</button>
        </div>
    )

}