import React from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { autoResize } from "../../../functions";
import { createCommentWithJSON } from "../../../API-functions/CommentAPI-functions";
import maleAvatar from '../../../assets/male-avatar-profile.jpg';


export default function NewComment({ postId, handleUpdate, handleAddComment }) {

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
            handleAddComment()
        })
    }

    return (
        <div className='new-comment'>
            <img src={user.imageUrl ? user.imageUrl : maleAvatar} className='profile-picture' alt={`Profil de ${user.pseudo}`} />
            <form className='new-comment__form'>
                <textarea ref={textInput} name="textarea" placeholder='Vous pouvez écrire ici.' onChange={autoResize}></textarea>
                <button type="submit" className='new-comment__form__validate' onClick={handleCreateComment} >Post</button>
            </form>
        </div>
    )
}