import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';
import { getAllPosts, getUserInfo } from '../API-functions';
import { getTimeAmount } from '../functions';

export default function PostContainer({ userConnected }) {

    const [postsList, setPostsList] = React.useState([])

    React.useEffect(() => {
        getAllPosts()
            .then((response) => {
                setPostsList(response.data)
            })
            .catch((error) => console.error(error))
    }, [])

    return (
        <section className='post-container'>
            {postsList.map(post => <Post sameUser={ userConnected.id===post.userId ? true : false }
                key={post.id} text={post.text} picture={post.imageUrl} timeOfCreation={getTimeAmount(post.created)} userId={post.userId} />)}
        </section>
    )
}

function Post({ text, picture, timeOfCreation, userId, sameUser}) {

    const [userPseudo, setUserPseudo] = React.useState('')
    const [userProfilePicture, setUserProfilePicture] = React.useState('')
    //const [sameUser, setSameUser] = React.useState(false)


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
            <header className='post__header'>
                <img src={userProfilePicture} className='profile-picture' alt='Profil' />
                <div>
                    <p className='post__header__user'>{userPseudo}</p>
                    <p>{timeOfCreation}</p>
                </div>
                <i className="post__header__icon-menu fas fa-ellipsis-h"></i>
                <nav className="post__header__menu">
                    <ul>
                        {sameUser ? <li className="post__header__menu__element">Modifier</li> : ''}
                        {sameUser ? <li className="post__header__menu__element">Supprimer</li> : ''}
                        <li className="post__header__menu__element post__header__menu__element--no-border">Signaler</li>
                    </ul>
                </nav>
            </header>
            <main className='post__main'>
                <p>{text}</p>
                {picture ? <img src={picture} alt='Profil' /> : ''}
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