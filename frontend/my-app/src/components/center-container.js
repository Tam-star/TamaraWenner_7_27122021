import React from 'react';
import { useOutletContext } from 'react-router-dom';
import NewPost from './newpost';
import PostContainer from './post-container';
import ProfileChange from './profile-change';
import ProfileContainer from './profile-container';

export default function CenterContainer({ centerElement }) {
    const [showModifyProfile, setShowModifyProfile] = React.useState(false)

    const handleModifyProfileContainer = (event) => {
        event.preventDefault()
        setShowModifyProfile(!showModifyProfile)
    }

    const user = useOutletContext()
    return (
        <section className='center-container'>
            {centerElement === 'profil' ?
                <>
                    <ProfileContainer user={user} handleClick={handleModifyProfileContainer} />
                    {showModifyProfile ? <ProfileChange user={user} handleClick={handleModifyProfileContainer} /> : ''}

                </> : ''}
            {centerElement === 'newsfeed' ?
                <>
                    <NewPost />
                    <PostContainer userConnected={user} />
                </> : ''}


        </section>
    )

}