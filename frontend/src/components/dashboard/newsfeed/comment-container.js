import React from 'react';
import { getAllCommentsOfPost } from '../../../API-functions/CommentAPI-functions';
import { getTimeAmount } from '../../../functions';
import { useUserContext } from '../../../Contexts/UserContext';
import Comment from './comment';
import NewComment from './new-comment';

export default function CommentContainer({ postId, addComment, handleAddComment, handleNumberOfComments }) {

    const [userConnected] = useUserContext()

    const [commentsList, setCommentsList] = React.useState([])
    const [commentUpdate, setCommentUpdate] = React.useState(false)
    const [showCommentSection, setShowCommentSection] = React.useState(true)

    const handleCommentUpdate = () => {
        setCommentUpdate(!commentUpdate)
    }


    React.useEffect(() => {
        getAllCommentsOfPost(postId)
            .then((response) => {
                setCommentsList(response.data)
                handleNumberOfComments(response.data.length)
                if (response.data.length === 0 && addComment === false) {
                    setShowCommentSection(false)
                }
                else {
                    setShowCommentSection(true)
                }
            })
            .catch((error) => console.error(error))
    }, [commentUpdate, addComment])

    if (showCommentSection) {
        return (
            <section className='comment-container'>
                {addComment ? <NewComment postId={postId} handleUpdate={handleCommentUpdate} handleAddComment={handleAddComment} /> : ''}
                <div className='comment-container__list'>
                    {commentsList.map(comment =>
                        <Comment sameUser={userConnected.id === comment.userId ? true : false}
                            key={comment.id} postId={postId} userId={comment.userId} commentId={comment.id}
                            text={comment.text} picture={comment.imageUrl}
                            timeOfCreation={getTimeAmount(comment.created)} handleUpdate={handleCommentUpdate} />)}
                </div>
            </section>
        )
    }
    else {
        return null;
    }
}


