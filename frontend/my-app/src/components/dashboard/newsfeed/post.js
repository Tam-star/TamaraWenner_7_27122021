import React from 'react';
import Modal from 'react-modal';
import maleAvatar from '../../../assets/male-avatar-profile.jpg';
import { getUserInfo } from '../../../API-functions/UserAPI-functions';
import { updatePostWithFormData, updatePostWithJSON, deletePost } from '../../../API-functions/PostAPI-functions';
import CommentContainer from './comment-container';


Modal.setAppElement('#root');

export default function Post({ postId, text, picture, timeOfCreation, userId, sameUser, handleUpdate }) {

    const [userPseudo, setUserPseudo] = React.useState('')
    const [userProfilePicture, setUserProfilePicture] = React.useState('')
    //Modify post
    const [modifyingPost, setModifyingPost] = React.useState(false)
    const [modifyingText, setModifyingText] = React.useState(text)
    const [modifyingPicture, setModifyingPicture] = React.useState(picture)
    //Deleting post
    const [modalIsOpen, setIsOpen] = React.useState(false);
    //Comment section
    const [addComment, setAddComment] = React.useState(false)

    const handleModifyingPost = (event) => {
        setModifyingPost(true)
    }

    const handleCloseModifying = (event) => {
        setModifyingPost(false)
    }
    const fileInput = React.useRef()
    const textInput = React.useRef()

    const handleTextArea = event => {
        event.preventDefault();
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight - 18}px`
        setModifyingText(event.target.value)
    }

    const handleFileChange = event => {
        const [file] = fileInput.current.files
        if (file) {
            setModifyingPicture(URL.createObjectURL(file))
        }
    }

    const handleFileRemove = event => {
        event.preventDefault()
        fileInput.current.value = ""
        setModifyingPicture(null)
    }

    const handleUpdatePost = event => {
        event.preventDefault()
        if (fileInput.current.files[0]) {
            const formData = new FormData();
            formData.append("post", `{"text" : "${textInput.current.value}", "userId" : ${userId}}`);
            formData.append('image', fileInput.current.files[0], fileInput.current.files[0].name)
            console.log(formData.getAll('post'))
            setModifyingPost(false)
            updatePostWithFormData(formData, postId).then(() => {
                handleUpdate()
            })
        }
        else {
            let request = {}
            if (modifyingPicture) {
                request = {
                    text: textInput.current.value,
                    userId: userId
                }
            } else {
                request = {
                    text: textInput.current.value,
                    userId: userId,
                    imageUrl: null
                }
            }

            updatePostWithJSON(request, postId).then(() => {
                handleUpdate()
                setModifyingPost(false)
            })
        }
    }

    //Deleting Post
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const handleDeletePost = (event) => {
        deletePost(postId).then(() => handleUpdate())
    }


    //Manage Comment Section
    const handleAddComment= () => {
        setAddComment(!addComment)
    }


    React.useEffect(() => {
        getUserInfo(userId)
            .then((response) => {
                setUserPseudo(response.data.pseudo)
                if (response.data.imageUrl !== null) {
                    setUserProfilePicture(response.data.imageUrl)
                }
                else {
                    setUserProfilePicture(maleAvatar)
                }
            })
            .catch((error) => console.error(error))
    }, [userId])


    return (
        <article className='post'>
            {modifyingPost ?
                // Se déclenche lorsque l'on clique sur Modifier
                <>
                    <header className='post__header'>
                        <img src={userProfilePicture} className='profile-picture' alt='Profil' />
                        <div>
                            <p className='post__header__user'>{userPseudo}</p>
                            <p>{timeOfCreation}</p>
                        </div>
                        <i className="fas fa-times modifying-post__close-icon" onClick={handleCloseModifying}></i>
                    </header>
                    <main className='post__main'>
                        <form className='modifying-post__form'>
                            <textarea ref={textInput} name="textarea" value={modifyingText} onChange={handleTextArea}></textarea>
                            <div className='new-post__form__file-div'>
                                <label htmlFor="imageInput">Choisissez une image : </label>
                                <input ref={fileInput} type="file" id="imageInput" name="imageInput" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange}></input>
                            </div>
                            {modifyingPicture ? <img className='new-post__post-picture' src={modifyingPicture} alt='Post picture' /> : ''}
                            {modifyingPicture ? <button onClick={handleFileRemove}>Supprimer l'image</button> : ''}
                        </form>
                        <button className='modifying-post__validate' onClick={handleUpdatePost} ><i className="fas fa-edit"></i>Update it!</button>
                    </main>
                </> :
                <>
                    {/* Se déclenche lorsque l'on appuie sur Supprimer */}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className={'delete-modal'}
                    >
                        <i className="fas fa-times profile-change__icon" onClick={closeModal}></i>
                        <h2>Supprimer le post</h2>
                        <p>Êtes-vous sûr de vouloir supprimer ce post ?</p>
                        <div>
                            <button onClick={handleDeletePost}>Oui</button>
                            <button onClick={closeModal}>Non</button>
                        </div>
                    </Modal>
                    <header className='post__header'>
                        <img src={userProfilePicture} className='profile-picture' alt='Profil' />
                        <div>
                            <p className='post__header__user'>{userPseudo}</p>
                            <p>{timeOfCreation}</p>
                        </div>
                        <i className="post__header__icon-menu fas fa-ellipsis-h"></i>
                        <nav className="post__header__menu">
                            <ul>
                                {sameUser ? <li className="post__header__menu__element" onClick={handleModifyingPost}>Modifier</li> : ''}
                                {sameUser ? <li className="post__header__menu__element" onClick={openModal}>Supprimer</li> : ''}
                                <li className="post__header__menu__element post__header__menu__element--no-border">Signaler</li>
                            </ul>
                        </nav>
                    </header>
                    <main className='post__main'>
                        <p>{text}</p>
                        {picture ? <img src={picture} className='post__main__post-picture' alt='Profil' /> : ''}
                    </main>
                    <footer className='post__footer'>
                        <nav className='post__footer__menu'>
                            <ul>
                                <li><i className="fas fa-thumbs-up"></i>J'aime</li>
                                <li  onClick={handleAddComment}><i className="far fa-comment"></i>Commenter</li>
                            </ul>
                        </nav>
                        <CommentContainer postId={postId} addComment={addComment} />
                    </footer>
                </>}

        </article>




    )
}
