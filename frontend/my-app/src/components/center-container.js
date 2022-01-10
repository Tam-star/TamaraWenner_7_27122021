import React from 'react';
import { useOutletContext } from 'react-router-dom';
import NewPost from './dashboard/newsfeed/newpost';
import PostContainer from './dashboard/newsfeed/post-container';
import ProfileChange from './dashboard/profile/profile-change';
import ProfileContainer from './dashboard/profile/profile-container';
import SettingsContainer from './dashboard/settings/settings-container';

export default function CenterContainer({ centerElement }) {
    const [showModifyProfile, setShowModifyProfile] = React.useState(false)
    const [postUpdate, setPostUpdate] = React.useState(false)
    const [userUpdate, setUserUpdate] = React.useState(false)

    const handlePostUpdate = () => {
        setPostUpdate(!postUpdate)
    }

    const handleUserUpdate = () => {
        setUserUpdate(!userUpdate)
    }    

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
                    <NewPost userConnected={user} handleUpdate={handlePostUpdate} />
                    <PostContainer userConnected={user} postUpdate={postUpdate} handleUpdate={handlePostUpdate} />
                </> : ''}
            {centerElement === 'settings' ?
                <>
                    <SettingsContainer user={user} />
                </> : ''}


        </section>
    )

}