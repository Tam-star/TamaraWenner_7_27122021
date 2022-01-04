import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';
import postPicture from '../assets/post-picture.jpg';
import { getAllPosts } from '../API-functions';

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
            {postsList.map( post =>  <Post key={post.id} text={post.text} picture={post.imageUrl} /> )}
            <Post picture={postPicture} text={`This was one of the most epic journey I've ever done in my whole life. I am so happy to be here to talk about it`}/>
            <Post text={'Coucou'} />
            <Post picture={postPicture}/>
            <Post text = {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}/>
        </section>
    )
}

function Post({ text, picture }) {
    return (
        <article className='post'>
            <header className='post__header'>
                <img src={maleAvatar} className='profile-picture' alt='Profil' />
                <div>
                    <p className='post__header__user'>Laura Fisher</p>
                    <p>8 hours ago</p>
                </div>
            </header>
            <main className='post__main'>
                <p>{text}</p>
                {picture ? <img src={picture} className='profile-picture' alt='Profil' /> : ''}
            </main>
        </article>
    )
}