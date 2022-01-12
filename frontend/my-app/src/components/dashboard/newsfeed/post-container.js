import React from 'react';
import { getAllPosts } from '../../../API-functions/PostAPI-functions';
import { getTimeAmount,  useUserContext } from '../../../functions';
import Post from './post';

export default function PostContainer({ postUpdate, handleUpdate }) {

    const [postsList, setPostsList] = React.useState([])
    const [userConnected] = useUserContext()

    React.useEffect(() => {
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

