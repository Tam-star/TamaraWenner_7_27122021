import React from 'react';
import { useOutletContext } from 'react-router-dom';
import NewPost from './newpost';
import PostContainer from './post-container';
import ProfileContainer from './profile-container';

export default function CenterContainer({ centerElement }) {
    const user = useOutletContext()
    return (
        <section className='center-container'>
            {centerElement === 'profil' ? <ProfileContainer user={user} /> : ''}
            {centerElement === 'newsfeed' ? <>
                <NewPost />
                <PostContainer userConnected={user} />
            </> : ''}


        </section>
    )

}