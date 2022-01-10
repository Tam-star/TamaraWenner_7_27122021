import React from 'react';
import { useOutletContext } from 'react-router-dom';
import NewPost from './dashboard/newpost';
import PostContainer from './dashboard/post-container';
import ProfileChange from './dashboard/profile-change';
import ProfileContainer from './dashboard/profile-container';
import SettingsContainer from './dashboard/settings-container';

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
                    <NewPost  userConnected={user} />
                    <PostContainer userConnected={user} />
                </> : ''}
            {centerElement === 'settings' ?
                <>
                    <SettingsContainer />
                </> : ''}


        </section>
    )

}