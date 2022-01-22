import React from 'react';
import Modal from 'react-modal';
import maleAvatar from '../../../assets/male-avatar-profile.jpg';
import { autoResize, formDataEscaping, getTimeAmount } from "../../../functions";
import { getUserInfo } from '../../../API-functions/UserAPI-functions';
import { updatePostWithFormData, updatePostWithJSON, deletePost, likePost, getOnePost } from '../../../API-functions/PostAPI-functions';
import CommentContainer from './comment-container';
import { useThemeContext } from '../../../Contexts/ThemeContext';
import { useUserContext } from '../../../Contexts/UserContext';
import { useParams } from 'react-router-dom';


Modal.setAppElement('#root');

export default function Post({ sameUser, handleUpdate, post }) {

    const params = useParams()
    const [mode] = useThemeContext()
    const [userConnected] = useUserContext()
    const [thisPost, setThisPost] = React.useState(post)


    const handleUpdateThisPost = () =>{
        getOnePost(post.id)
        .then(response => {
            console.log(response)
            setThisPost(response.data)
        })
    }

    const timeOfCreation = getTimeAmount(thisPost.created)
    const [userPseudo, setUserPseudo] = React.useState('')
    const [userProfilePicture, setUserProfilePicture] = React.useState('')

    //Menu
    const [menu, setMenu] = React.useState(false)

    //Modify post
    const [modifyingPost, setModifyingPost] = React.useState(false)
    const [modifyingText, setModifyingText] = React.useState(thisPost.text)
    const [modifyingPicture, setModifyingPicture] = React.useState(thisPost.imageUrl)

    //Deleting post
    const [modalIsOpen, setIsOpen] = React.useState(false);

    //Comment section
    const [addComment, setAddComment] = React.useState(false)
    const [numberOfComments, setNumberOfComments] = React.useState(0)

    //Likes
    const [like, setLike] = React.useState(thisPost.usersLiked.split(',').includes(params.userId) ? 1 : 0)
    const [numberOfLikes, setNumberOfLikes] = React.useState(thisPost.usersLiked === '' ? 0 : thisPost.usersLiked.split(',').length)
    const likeColor = mode === 'dark' ? 'white' : 'black'

    //Affiche le menu du Post
    const handleMenu = (event) => {
        event.stopPropagation()
        setMenu(!menu)
    }
    //Enlève le menu du post quand l'utilisateur clique à l'extérieur
    document.body.addEventListener('click', () => {
        if (menu) {
            setMenu(false)
        }
    })

    //Permet de modifier le post
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
        autoResize(event)
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
            console.log('request with formdata')
            const formData = new FormData();
            formData.append("post", `{"text" : "${formDataEscaping(textInput.current.value)}", "userId" : ${thisPost.userId}}`);
            formData.append('image', fileInput.current.files[0], fileInput.current.files[0].name)

            setModifyingPost(false)
            updatePostWithFormData(formData, thisPost.id).then(() => {
                handleUpdateThisPost()
            })
        }
        else {
            console.log('request with JSON')
            let request = {}
            if (modifyingPicture) {
                request = {
                    text: textInput.current.value,
                    userId: thisPost.userId
                }
            } else {
                request = {
                    text: textInput.current.value,
                    userId: thisPost.userId,
                    imageUrl: null
                }
            }
            setModifyingPost(false)
            updatePostWithJSON(request, thisPost.id).then(() => {
                handleUpdateThisPost()
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
        deletePost(thisPost.id).then(() => handleUpdate())
    }


    //Manage Likes 
    const handleLike = () => {
        if (like === 1) {
            setLike(0)
            
        } else {
            setLike(1)
        }
        console.log(like)
    }

    //Manage Comment Section
    const handleAddComment = () => {
        setAddComment(!addComment)
    }


    React.useEffect(() => {
        console.log('getuser')
        getUserInfo(post.userId)
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
    }, [post.userId])


    const isFirstRender = React.useRef(true);


    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
        }
        else {
            let request = {
                userId: userConnected.id
            }
            like ? request['like'] = 1 : request['like'] = 0
            like ? setNumberOfLikes(numberOfLikes + 1) : setNumberOfLikes(numberOfLikes - 1)
            likePost(request, thisPost.id)
                .then((response) => {
                    handleUpdateThisPost()
                })
                .catch((error) => console.log(error))
        }
    }, [like])



    return (
        <article className={mode === 'dark' ? 'post post--dark' : 'post'}>
            {modifyingPost ?
                // Se déclenche lorsque l'on clique sur Modifier
                <>
                    <header className='post__header'>
                        <img src={userProfilePicture} className='profile-picture' alt={`Profil de ${userPseudo}`} />
                        <div>
                            <p className='post__header__user'>{userPseudo}</p>
                            <p>{timeOfCreation}</p>
                        </div>
                        <i tabIndex="0" className="fas fa-times modifying-post__close-icon" aria-label="Exit" onClick={handleCloseModifying} onKeyUp={(event) => { if (event.code === 'Enter') handleCloseModifying(event) }}></i>
                    </header>
                    <main className='post__main'>
                        <form className='modifying-post__form'>
                            <textarea ref={textInput} name="textarea" value={modifyingText} onChange={handleTextArea}></textarea>
                            <div className='new-post__form__file-div'>
                                <label htmlFor="imageInput">Choisissez une image : </label>
                                <input ref={fileInput} type="file" id="imageInput" name="imageInput" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange}></input>
                            </div>
                            {modifyingPicture ? <img className='new-post__post-picture' src={modifyingPicture} alt='Image du post à modifier' /> : ''}
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
                        <i tabIndex="0" className="fas fa-times profile-change__icon" aria-label="Exit" onClick={closeModal} onKeyUp={(event) => { if (event.code === 'Enter') closeModal(event) }}></i>
                        <h2>Supprimer le post</h2>
                        <p>Êtes-vous sûr de vouloir supprimer ce post ?</p>
                        <div>
                            <button onClick={handleDeletePost}>Oui</button>
                            <button onClick={closeModal}>Non</button>
                        </div>
                    </Modal>
                    <header className='post__header'>
                        <img src={userProfilePicture} className='profile-picture' alt={`Profil de ${userPseudo}`} />
                        <div>
                            <p className='post__header__user'>{userPseudo}</p>
                            <p>{timeOfCreation}</p>
                        </div>
                        <i tabIndex="0" className="post__header__icon-menu fas fa-ellipsis-h" onClick={handleMenu} role='link' aria-label='post menu' onKeyUp={(event) => { if (event.code === 'Enter') handleMenu(event) }}></i>
                        {menu ?
                            <nav className={mode === 'dark' ? "post__header__menu post__header__menu--dark" : "post__header__menu"}>
                                <ul >
                                    {sameUser ? <li className={mode === 'dark' ? "post__header__menu__element post__header__menu__element--dark " : "post__header__menu__element"} onClick={handleModifyingPost} tabIndex="0" onKeyUp={(event) => { if (event.code === 'Enter') handleModifyingPost() }} >Modifier</li> : ''}
                                    {sameUser || userConnected.rights === 'moderator' ? <li className={mode === 'dark' ? "post__header__menu__element post__header__menu__element--dark " : "post__header__menu__element"} onClick={openModal} tabIndex="0">Supprimer</li> : ''}
                                    <li className={mode === 'dark' ? "post__header__menu__element post__header__menu__element--dark post__header__menu__element--no-border" : "post__header__menu__element post__header__menu__element--no-border"} tabIndex="0" > <a href={`mailto: groupomania_moderateur@yahoo.com?subject=Signalement post créé le ${post.created} par ${userPseudo}`}>Signaler</a></li>
                                </ul>
                            </nav> : ''}
                    </header>
                    <main className='post__main'>
                        <p>{thisPost.text}</p>
                        {thisPost.imageUrl ? <img src={thisPost.imageUrl} className='post__main__post-picture' alt='Image liée au post' /> : ''}
                    </main>
                    <footer className='post__footer'>
                        <nav className='post__footer__menu'>
                            <ul>
                                <li tabIndex="0" style={like ? { color: 'red' } : { likeColor }} onClick={handleLike} onKeyUp={(event) => { if (event.code === 'Enter') handleLike() }}><i className="fas fa-thumbs-up"></i>J'aime</li>
                                <li tabIndex="0" onClick={handleAddComment} onKeyUp={(event) => { if (event.code === 'Enter') handleAddComment() }}><i className="far fa-comment"></i>Commenter</li>
                            </ul>
                            <div className='post__footer__menu__stats'>
                                <p>{numberOfLikes} like{numberOfLikes > 1 ? 's' : ''}</p>
                                <p>{numberOfComments} commentaire{numberOfComments > 1 ? 's' : ''}</p>
                            </div>
                        </nav>
                        <CommentContainer postId={post.id} addComment={addComment} handleAddComment={handleAddComment} handleNumberOfComments={setNumberOfComments} />
                    </footer>
                </>}

        </article>




    )
}
