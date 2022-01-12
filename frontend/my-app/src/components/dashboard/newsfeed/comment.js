import React from "react";
import { UserContext } from "../../../Contexts/UserContext";
import maleAvatar from '../../../assets/male-avatar-profile.jpg';
import { deleteComment } from "../../../API-functions/CommentAPI-functions";

export default function Comment({ text, commentId, handleUpdate }) {

    const [user] = React.useContext(UserContext)
    const handleDeleteComment = () => {
        deleteComment(commentId).then(() => handleUpdate())
    }

    return (
        <div className='comment'>
            <nav className="comment__menu">
                <i title="Modifier" className="fas fa-edit"></i>
                <i title="Supprimer" className="fas fa-trash-alt" onClick={handleDeleteComment}></i>
            </nav>
            <img src={user.imageUrl ? user.imageUrl : maleAvatar} alt='Profil' />
            <p>{text}</p>
        </div>
    )
}