import React from "react";
import maleAvatar from '../../assets/male-avatar-profile.jpg';
import { useUserContext } from "../../Contexts/UserContext";


export default function AsideCard() {

    const [user] = useUserContext()

    return (
        <aside className='profile-aside'>
            <img src={user.imageUrl ? user.imageUrl : maleAvatar} alt='Profil' />
            <p>Bonjour {user.pseudo} !</p>
        </aside>
    )
}