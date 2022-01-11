import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../API-functions/UserAPI-functions';
import { useUserContext } from '../../functions';

export default function UserNav() {

    const [user] = useUserContext()

    const disconnect = (event) => {
        logout()
            .then((data) => {
                console.log('data from logout : ', data)
                window.location.href = `../login`
            })
    }

    return (
        <nav className='left-menu'>
            <ul>
                <Link className='left-menu__link' to={`/dashboard/${user.id}/profile`}><li className='left-menu__element'><i className="fas fa-user"></i> Profil</li></Link>
                <Link className='left-menu__link' to={`/dashboard/${user.id}/newsfeed`}><li className='left-menu__element' ><i className="far fa-newspaper"></i> Journal</li></Link>
                <Link className='left-menu__link' to={`/dashboard/${user.id}/settings`}><li className='left-menu__element' ><i className="fas fa-cog"></i> Paramètres</li></Link>
                <li className='left-menu__element left-menu__element--no-border' onClick={disconnect}><i className="fas fa-unlink"></i> Déconnexion</li>
            </ul>
        </nav>
    )

}