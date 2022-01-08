import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function NewPost() {

    const [picture, setPicture] = React.useState()

    const autoResize = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight - 18}px`
        console.log('scroll height : ' + event.target.scrollHeight + 'px')
    }

    const handleFileChange = event => {
        const [file] = document.getElementById('imageInput').files
        if (file) {
            setPicture(URL.createObjectURL(file))
        }
    }

    const handleFileRemove = event => {
        event.preventDefault()
        document.getElementById('imageInput').value = ""
        setPicture(null)
    }

    return (
        <div className='new-post'>
            <img src={maleAvatar} className='profile-picture' alt='Profil' />
            <form className='new-post__form'>
                <textarea name="textarea" placeholder='Vous pouvez écrire ici.' onChange={autoResize}></textarea>
                <div className='new-post__form__file-div'>
                    <label htmlFor="imageInput">Choisissez une image : </label>
                    <input type="file" id="imageInput" name="imageInput" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange}></input>
                </div>
                {picture ? <img className='new-post__post-picture' src={picture} alt='Post picture' /> : ''}
                {picture ?  <button onClick={handleFileRemove}>Supprimer l'image</button> : ''}
               
            </form>
            <button className='new-post__validate'><i className="fas fa-link"></i>Post it!</button>
        </div>
    )

}

// const textarea = document.querySelector("textarea");
// textarea.addEventListener('input', autoResize, false);

