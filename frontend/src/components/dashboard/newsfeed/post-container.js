import React from 'react';
import { getAllPosts } from '../../../API-functions/PostAPI-functions';
import { getTimeAmount } from '../../../functions';
import Post from './post';
import { useUserContext } from '../../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function PostContainer({ postUpdate, handleUpdate }) {

    const [postsList, setPostsList] = React.useState([])
    const [userConnected] = useUserContext()
    const navigate = useNavigate()

    React.useEffect(() => {
        getAllPosts()
            .then((response) => {
                setPostsList(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                //navigate('../../500')
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


