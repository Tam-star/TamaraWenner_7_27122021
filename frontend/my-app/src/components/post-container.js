import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';
import postPicture from '../assets/post-picture.jpg';

export default function PostContainer() {
    return (
        <section>
            <Post picture={postPicture}/>
            <Post />
            <Post picture={postPicture}/>
            <Post />
        </section>
    )

}

function Post({ picture }) {
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
                <p>This was one of the most epic journey I've ever done in my whole life. I am so happy to be here to talk about it</p>
                {picture ? <img src={picture} className='profile-picture' alt='Profil' /> : ''}
            </main>
        </article>
    )
}