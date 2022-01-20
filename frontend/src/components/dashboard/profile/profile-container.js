import React from 'react';
import maleAvatar from '../../../assets/male-avatar-profile.jpg';
import { useThemeContext } from '../../../Contexts/ThemeContext';
import { useUserContext } from '../../../Contexts/UserContext';


export default function ProfileContainer({ handleClick }) {
    const [user] = useUserContext()
    const [mode] = useThemeContext()

    return (
        <section className={mode==='dark' ? 'profile-container profile-container--dark' : 'profile-container'}>
            <img src={user.imageUrl ? user.imageUrl : maleAvatar} className='profile-picture' alt='Votre profil' />
            <div>
                <p><span className='profile-container__title'>Nom : </span>{user.lastname}</p>
                <p><span className='profile-container__title'>Prénom : </span>{user.firstname}</p>
                <p><span className='profile-container__title'>Pseudo : </span>{user.pseudo}</p>
                <p><span className='profile-container__title'>Email :  </span>{user.email}</p>
                <p><span className='profile-container__title'>Bio :  </span>{user.bio}</p>
            </div>
            <i tabIndex='0' title='Modifier son profil' aria-label='Modifier votre profil' className="fas fa-pen profile-container__modify-icon" onClick={handleClick} onKeyUp={(event) => { if (event.code === 'Enter') handleClick(event) }}></i>
        </section>
    )
}

