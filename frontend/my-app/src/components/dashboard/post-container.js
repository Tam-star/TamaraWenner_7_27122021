import React from 'react';
import Modal from 'react-modal';
import maleAvatar from '../../assets/male-avatar-profile.jpg';
import { getUserInfo } from '../../API-functions/UserAPI-functions';
import { deletePost, getAllPosts } from '../../API-functions/PostAPI-functions';
import { getTimeAmount } from '../../functions';

export default function PostContainer({ userConnected, postUpdate, handleUpdate }) {

    const [postsList, setPostsList] = React.useState([])

    React.useEffect(() => {
        console.log('use effect for posts')
        getAllPosts()
            .then((response) => {
                setPostsList(response.data)
            })
            .catch((error) => console.error(error))
    }, [postUpdate])

    return (
        <section className='post-container'>
            {postsList.map(post =>
                <Post sameUser={userConnected.id === post.userId ? true : false}
                    key={post.id} postId={post.id} text={post.text} picture={post.imageUrl}
                    timeOfCreation={getTimeAmount(post.created)} userId={post.userId}
                    handleUpdate={handleUpdate} />)}
        </section>
    )
}


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

function Post({ postId, text, picture, timeOfCreation, userId, sameUser, handleUpdate }) {

    const [userPseudo, setUserPseudo] = React.useState('')
    const [userProfilePicture, setUserProfilePicture] = React.useState('')

    //Modal for modifying
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalPicture, setModalPicture] = React.useState(picture)
    const [modalText, setModalText] = React.useState(text)
    const fileInputModal = React.useRef()
    const textInputModal = React.useRef()

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const autoResize = event => {
        event.preventDefault();
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight - 18}px`
        setModalText(event.target.value)
    }

    const handleFileChange = event => {
        const [file] = fileInputModal.current.files
        if (file) {
            setModalPicture(URL.createObjectURL(file))
        }
    }

    const handleFileRemove = event => {
        event.preventDefault()
        fileInputModal.current.value = ""
        setModalPicture(null)
    }

    //Deleting Post
    const handleDeletePost = (event) => {
        deletePost(postId).then(() => handleUpdate())
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
            {/* <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >   
                <i className="fas fa-times profile-change__icon" onClick={closeModal}></i>
                <h2>Supprimer le post</h2>
                <p>Êtes-vous sûr de vouloir supprimer ce post ?</p>
            </Modal> */}
            {/* Modal for modifying */}
            <Modal
                className='modifying-post-modal'
                //overlayClassName="modifying-post-overlay-modal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                //style={customStyles}
                contentLabel="Example Modal"
            >   
                <i className="fas fa-times modal-close-icon" onClick={closeModal}></i>
                <h2>Modifiez votre post</h2>
                <div className='new-post'>
                    <img src={maleAvatar} className='profile-picture' alt='Profil' />
                    <form className='new-post__form'>
                        <textarea ref={textInputModal} name="textarea" value={modalText} onChange={autoResize}></textarea>
                        <div className='new-post__form__file-div'>
                            <label htmlFor="imageInput">Choisissez une image : </label>
                            <input ref={fileInputModal} type="file" id="imageInput" name="imageInput" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange}></input>
                        </div>
                        {modalPicture ? <img className='new-post__post-picture' src={modalPicture} alt='Post picture' /> : ''}
                        {modalPicture ? <button onClick={handleFileRemove}>Supprimer l'image</button> : ''}
                    </form>
                    <button className='new-post__validate' ><i className="fas fa-edit"></i>Update it!</button>
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
                        {sameUser ? <li className="post__header__menu__element" onClick={openModal}>Modifier</li> : ''}
                        {sameUser ? <li className="post__header__menu__element" onClick={handleDeletePost}>Supprimer</li> : ''}
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
                        <li><i className="far fa-comment"></i>Commenter</li>
                    </ul>
                </nav>
            </footer>
        </article>
    )
}