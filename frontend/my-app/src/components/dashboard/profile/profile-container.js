import React from 'react';
import maleAvatar from '../../../assets/male-avatar-profile.jpg';
import { useThemeContext } from '../../../Contexts/ThemeContext';
import { useUserContext } from '../../../Contexts/UserContext';


export default function ProfileContainer({ handleClick }) {
    const [user] = useUserContext()
    const [mode] = useThemeContext()

    return (
        <section className={mode==='dark' ? 'profile-container profile-container--dark' : 'profile-container'}>
            <img src={user.imageUrl ? user.imageUrl : maleAvatar} className='profile-picture' alt='Profil' />
            <div>
                <p>Nom : {user.lastname}</p>
                <p>Prénom :  {user.firstname}</p>
                <p>Pseudo : {user.pseudo}</p>
                <p>Email :  {user.email}</p>
                <p>Bio :  {user.bio}</p>
            </div>
            <i title='Modifier son profil' className="fas fa-pen profile-container__modify-icon" onClick={handleClick}></i>
        </section>
    )
}

