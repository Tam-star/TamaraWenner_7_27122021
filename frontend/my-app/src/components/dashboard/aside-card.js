import React from "react";
import maleAvatar from '../../assets/male-avatar-profile.jpg';
import { useUserContext } from "../../Contexts/UserContext";
import { useThemeContext } from "../../Contexts/ThemeContext";


export default function AsideCard() {

    const [user] = useUserContext()
    const [mode] = useThemeContext()

    return (
        <aside className={mode==='dark' ? 'profile-aside profile-aside--dark' : 'profile-aside'}>
            <img src={user.imageUrl ? user.imageUrl : maleAvatar} alt='Profil' />
            <p>Bonjour {user.pseudo} !</p>
        </aside>
    )
}