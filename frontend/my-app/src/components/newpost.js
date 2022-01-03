import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function NewPost() {

    const autoResize = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight-18}px`
        console.log('scroll height : '+ event.target.scrollHeight + 'px')
    }

    return (
        <div className='new-post'>
            <img src={maleAvatar} className='profile-picture' alt='Profil' />
            <form className='new-post__form'>
                <textarea name="textarea" placeholder='Vous pouvez écrire ici.' onChange={autoResize}></textarea>
            </form>
            <button><i className="fas fa-link"></i>Post it!</button>
        </div>
    )

}

// const textarea = document.querySelector("textarea");
// textarea.addEventListener('input', autoResize, false);

