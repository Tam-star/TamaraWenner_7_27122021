import React from 'react';
import { getAllPosts } from '../../../API-functions/PostAPI-functions';
import Post from './post';
import { useUserContext } from '../../../Contexts/UserContext';

export default function PostContainer({ postUpdate, handleUpdate }) {

    const [postsList, setPostsList] = React.useState([])
    const [userConnected] = useUserContext()

    React.useEffect(() => {
        getAllPosts()
            .then((response) => {
                setPostsList(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [postUpdate])

    return (
        <section className='post-container'>
            {postsList.map(post =>
                <Post sameUser={userConnected.id === post.userId ? true : false}
                    key={post.id}
                    post={post}
                    handleUpdate={handleUpdate} />)}
        </section>
    )
}


