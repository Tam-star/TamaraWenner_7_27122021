import React from 'react';
import { createPostWithFormData, createPostWithJSON } from '../../../API-functions/PostAPI-functions';
import maleAvatar from '../../../assets/male-avatar-profile.jpg';
import { UserContext } from '../../../UserContext';

export default function NewPost({ handleUpdate }) {

    const fileInput = React.useRef()
    const textInput = React.useRef()
    const [userConnected] = React.useContext(UserContext)
    const [picture, setPicture] = React.useState()

    const autoResize = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight - 18}px`
    }

    const handleFileChange = event => {
        const [file] = fileInput.current.files
        if (file) {
            setPicture(URL.createObjectURL(file))
        }
    }

    const handleFileRemove = event => {
        event.preventDefault()
        fileInput.current.value = ""
        setPicture(null)
    }

    const handleCreatePost = event => {
        event.preventDefault()
        if (fileInput.current.files[0]) {
            const formData = new FormData();
            formData.append("post", `{"text" : "${textInput.current.value}", "userId" : ${userConnected.id}}`);
            formData.append('image', fileInput.current.files[0], fileInput.current.files[0].name)
            createPostWithFormData(formData).then(() => {
                handleUpdate()
                fileInput.current.value = ""
                setPicture(null)
                textInput.current.value = ''
            })
        }
        else {
            const request = {
                text: textInput.current.value,
                userId: userConnected.id
            }
            createPostWithJSON(request).then(() => {
                handleUpdate()
                textInput.current.value = ''
            })
        }
    }

    return (
        <div className='new-post'>
            <img src={userConnected.imageUrl ? userConnected.imageUrl : maleAvatar} className='profile-picture' alt='Profil' />
            <form className='new-post__form'>
                <textarea ref={textInput} name="textarea" placeholder='Vous pouvez écrire ici.' onChange={autoResize}></textarea>
                <div className='new-post__form__file-div'>
                    <label htmlFor="imageInput">Choisissez une image : </label>
                    <input ref={fileInput} type="file" id="imageInput" name="imageInput" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange}></input>
                </div>
                {picture ? <img className='new-post__post-picture' src={picture} alt='Post picture' /> : ''}
                {picture ? <button onClick={handleFileRemove}>Supprimer l'image</button> : ''}
            </form>
            <button className='new-post__validate' onClick={handleCreatePost}><i className="fas fa-link"></i>Post it!</button>
        </div>
    )

}

// const textarea = document.querySelector("textarea");
// textarea.addEventListener('input', autoResize, false);

