import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';
import postPicture from '../assets/post-picture.jpg';
import { getAllPosts, getUserInfo } from '../API-functions';
import { getTimeAmount} from '../functions';

export default function PostContainer() {

    const [postsList, setPostsList] = React.useState([])

    React.useEffect(() => {
        getAllPosts()
        .then((response) => {
            setPostsList(response.data)
        })
        .catch((error) => console.error(error))
      }, [])

    return (
        <section>
            {postsList.map( post =>  <Post key={post.id} text={post.text} picture={post.imageUrl} timeOfCreation={getTimeAmount(post.created)}  userId={post.userId} /> )}
        </section>
    )
}

function Post({ text, picture, timeOfCreation, userId }) {

    const [userPseudo, setUserPseudo] = React.useState('')
    const [userProfilePicture, setUserProfilePicture] = React.useState('')


    React.useEffect(() => {
        getUserInfo(userId)
        .then((response) => {
            setUserPseudo(response.data.pseudo)
            if(response.data.imageUrl!==null){
                setUserProfilePicture(response.data.imageUrl)
            }
            else{
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
            </header>
            <main className='post__main'>
                <p>{text}</p>
                {picture ? <img src={picture} alt='Profil' /> : ''}
            </main>
        </article>
    )
}