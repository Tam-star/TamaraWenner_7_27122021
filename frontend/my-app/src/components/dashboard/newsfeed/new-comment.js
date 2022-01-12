import React from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { autoResize } from "../../../functions";
import { createCommentWithJSON } from "../../../API-functions/CommentAPI-functions";
import maleAvatar from '../../../assets/male-avatar-profile.jpg';


export default function NewComment({ postId, handleUpdate }) {

    const textInput = React.useRef()
    const [user] = React.useContext(UserContext)

    const handleCreateComment = event => {
        event.preventDefault()
        const request = {
            text: textInput.current.value,
            userId: user.id,
            postId : postId
        }
        createCommentWithJSON(request).then(() => {
            handleUpdate()
            textInput.current.value = ''
        })
    }

    return (
        <div className='new-comment'>
            <img src={user.imageUrl ? user.imageUrl : maleAvatar} className='profile-picture' alt='Profil' />
            <form className='new-comment__form'>
                <textarea ref={textInput} name="textarea" placeholder='Vous pouvez écrire ici.' onChange={autoResize}></textarea>
                {/* <div className='new-comment__form__file-div'>
                    <label htmlFor="imageInput">Choisissez une image : </label>
                    <input ref={fileInput} type="file" id="imageInput" name="imageInput" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange}></input>
                </div> */}
                {/* {picture ? <img className='new-comment__comment-picture' src={picture} alt='Comment picture' /> : ''}
                {picture ? <button onClick={handleFileRemove}>Supprimer l'image</button> : ''} */}
                <button type="submit" className='new-comment__form__validate' onClick={handleCreateComment} >Post</button>
            </form>
        </div>
    )
}