import React from 'react';
import NewPost from './dashboard/newsfeed/newpost';
import PostContainer from './dashboard/newsfeed/post-container';
import ProfileChange from './dashboard/profile/profile-change';
import ProfileContainer from './dashboard/profile/profile-container';
import SettingsContainer from './dashboard/settings/settings-container';

export default function CenterContainer({ centerElement }) {
    const [showModifyProfile, setShowModifyProfile] = React.useState(false)
    const [postUpdate, setPostUpdate] = React.useState(false)

    const handlePostUpdate = () => {
        setPostUpdate(!postUpdate)
    }

    const handleModifyProfileContainer = (event) => {
        event.preventDefault()
        setShowModifyProfile(!showModifyProfile)
    }

    return (
        <section className='center-container'>
            {centerElement === 'profil' ?
                <>
                    <ProfileContainer  handleClick={handleModifyProfileContainer} />
                    {showModifyProfile ? <ProfileChange handleClick={handleModifyProfileContainer} /> : ''}

                </> : ''}
            {centerElement === 'newsfeed' ?
                <>
                    <NewPost  handleUpdate={handlePostUpdate} />
                    <PostContainer postUpdate={postUpdate} handleUpdate={handlePostUpdate} />
                </> : ''}
            {centerElement === 'settings' ?
                <>
                    <SettingsContainer />
                </> : ''}


        </section>
    )

}