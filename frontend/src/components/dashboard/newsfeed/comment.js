import React from "react";
import maleAvatar from '../../../assets/male-avatar-profile.jpg';
import { deleteComment, updateCommentWithJSON } from "../../../API-functions/CommentAPI-functions";
import { getUserInfo } from "../../../API-functions/UserAPI-functions";
import { autoResize } from "../../../functions";
import { useThemeContext } from "../../../Contexts/ThemeContext";

export default function Comment({ text, commentId, userId, sameUser, handleUpdate, timeOfCreation }) {

    const [mode] = useThemeContext()

    const [userPseudo, setUserPseudo] = React.useState('')
    const [userPicture, setUserPicture] = React.useState()
    const [modifyComment, setModifyComment] = React.useState(false)
    const [modifyingText, setModifyingText] = React.useState(text)


    const handleTextArea = event => {
        event.preventDefault();
        autoResize(event)
        setModifyingText(event.target.value)
    }

    const handleModifyComment = () => {
        setModifyComment(!modifyComment)
    }

    const handleUpdateComment = event => {
        event.preventDefault()
        const request = {
            text: modifyingText,
            userId: userId,
        }


        updateCommentWithJSON(request, commentId).then(() => {
            handleUpdate()
            setModifyComment(false)
        })

    }

    const handleDeleteComment = () => {
        deleteComment(commentId).then(() => handleUpdate())
    }

    React.useEffect(() => {
        getUserInfo(userId)
            .then((response) => {
                setUserPicture(response.data.imageUrl)
                setUserPseudo(response.data.pseudo)
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <div className={mode==='dark' ? 'comment comment--dark':'comment'}>
            {sameUser ?
                <nav className="comment__menu">
                    <i title="Modifier" className="fas fa-edit" onClick={handleModifyComment}></i>
                    <i title="Supprimer" className="fas fa-trash-alt" onClick={handleDeleteComment}></i>
                </nav>
                : ''}
            <img src={userPicture ? userPicture : maleAvatar} className='profile-picture' alt={`Profil de ${userPseudo}`} />
            {modifyComment ?
                <div className="comment__modifying">
                    <p><span className="comment__text__pseudo">{userPseudo}</span></p>
                    <form className='comment__modifying__form'>
                        <textarea name="textarea" value={modifyingText} onChange={handleTextArea}></textarea>
                        <button type="submit" className='comment__modifying__form__validate' onClick={handleUpdateComment}>Update</button>
                    </form>
                </div>
                :
                <div className="comment__text">
                    <p><span className="comment__text__pseudo">{userPseudo}</span> <span className="comment__text__datetime">{timeOfCreation}</span></p>
                    <p>{text}</p>
                </div>
            }


        </div>
    )

}