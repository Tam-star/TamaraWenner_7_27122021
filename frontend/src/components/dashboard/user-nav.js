import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../API-functions/UserAPI-functions';
import { useUserContext } from '../../Contexts/UserContext';
import { useThemeContext } from '../../Contexts/ThemeContext';

export default function UserNav() {

    const navigate = useNavigate()
    const [user] = useUserContext()
    const [mode] = useThemeContext()

    const disconnect = (event) => {
        sessionStorage.clear();
        logout()
            .then((data) => {
                console.log('data from logout : ', data)
                navigate('../login')
            })
    }

    return (
        <nav className={mode === 'dark' ? 'left-menu left-menu--dark' : 'left-menu'}>
            <ul>
                <Link className={mode === 'dark' ? 'left-menu__link left-menu__link--dark' : 'left-menu__link'} to={`/dashboard/${user.id}/profile`}>
                    <li className={mode === 'dark' ? 'left-menu__element left-menu__element--dark' : 'left-menu__element'}>
                        <i className="fas fa-user"></i> Profil
                    </li>
                </Link>
                <Link className={mode === 'dark' ? 'left-menu__link left-menu__link--dark' : 'left-menu__link'} to={`/dashboard/${user.id}/newsfeed`}>
                    <li className={mode === 'dark' ? 'left-menu__element left-menu__element--dark' : 'left-menu__element'} >
                        <i className="far fa-newspaper"></i> Journal
                    </li>
                </Link>
                <Link className={mode === 'dark' ? 'left-menu__link left-menu__link--dark' : 'left-menu__link'} to={`/dashboard/${user.id}/settings`}>
                    <li className={mode === 'dark' ? 'left-menu__element left-menu__element--dark' : 'left-menu__element'} >
                        <i className="fas fa-cog"></i> Paramètres
                    </li>
                </Link>
                <li tabIndex="0" className={mode === 'dark' ? 'left-menu__element left-menu__element--dark left-menu__element--no-border' : 'left-menu__element left-menu__element--no-border'}
                    onClick={disconnect} onKeyUp={(event) => { if (event.code === 'Enter') disconnect() }}>
                    <i className="fas fa-unlink"></i> Déconnexion
                </li>
            </ul>
        </nav>
    )

}