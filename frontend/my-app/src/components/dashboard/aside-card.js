import React from "react";
import { UserContext } from "../../Contexts/UserContext";
import maleAvatar from '../../assets/male-avatar-profile.jpg';


export default function AsideCard() {

    const [user] = React.useContext(UserContext)

    return (
        <aside className='profile-aside'>
            <img src={user.imageUrl ? user.imageUrl : maleAvatar} alt='Profil' />
            <p>Bonjour {user.pseudo} !</p>
        </aside>
    )
}