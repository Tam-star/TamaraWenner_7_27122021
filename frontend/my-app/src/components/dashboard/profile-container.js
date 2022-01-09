import React from 'react';
import maleAvatar from '../../assets/male-avatar-profile.jpg';

export default function ProfileContainer({user, handleClick}) {
    return (
        <section className='profile-container'>
            <img src={maleAvatar} className='profile-picture' alt='Profil' />
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

