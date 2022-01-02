import React from 'react';
import NewPost from './newpost';
import PostContainer from './post-container';

export default function CenterContainer() {
    return (
        <section className='center-container'> 
            <NewPost/>
            <PostContainer/>
        </section>
    )

}