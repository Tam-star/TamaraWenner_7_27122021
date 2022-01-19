import React from 'react';
import maleAvatar from '../../assets/male-avatar-profile.jpg';
import { useUserContext } from '../../Contexts/UserContext';

export default function SearchBar() {

    const [userConnected] = useUserContext()

    return (
        <div className='main-header__right-container'>
            <form className='main-header__form'>
                <i className="fas fa-search main-header__form__icon"></i>
                <input></input>
            </form>
            <img src={userConnected.imageUrl ? userConnected.imageUrl : maleAvatar} className='main-header__avatar' alt='Profil' />
        </div>
    )

}