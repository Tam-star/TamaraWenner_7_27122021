import React from 'react';
import NewPost from './newpost';
import PostContainer from './post-container';
import ProfileContainer from './profile-container';

export default function CenterContainer({ centerElement, user }) {
    return (
        <section className='center-container'>
            {/* {element} */}
            {centerElement === 'journal' ? <>
                <NewPost />
                <PostContainer />
            </> : ''}
            {centerElement === 'profil' ? <ProfileContainer user= {user}/> :''}

        </section>
    )

}