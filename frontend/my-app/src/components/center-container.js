import React from 'react';
import NewPost from './newpost';
import PostContainer from './post-container';
import ProfileContainer from './profile-container';

export default function CenterContainer({element}) {
    return (
        <section className='center-container'>
            {/* <ProfileContainer/> 
            <NewPost/>
            <PostContainer/> */}
            {element}
           
        </section>
    )

}