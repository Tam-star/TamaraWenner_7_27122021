import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../API-functions';

export default function Nav({ connected }) {

    const disconnect = (event) => {
        logout()
            .then((data) => {
                console.log('data from logout : ', data)
                window.location.href = `../login`
            })
    }

    if (!connected) {
        return (
            <nav className='left-menu'>
                <ul>
                    <Link className='left-menu__link' to="/"><li className='left-menu__element'><i className="fas fa-home"></i> Home</li></Link>
                    <Link className='left-menu__link' to="/signup"><li className='left-menu__element'><i className="fas fa-id-badge"></i> Inscription</li></Link>
                    <Link className='left-menu__link' to="/login"><li className='left-menu__element left-menu__element--no-border' ><i className="fas fa-link"></i> Connexion</li></Link>
                </ul>
            </nav>
        )
    }
    return (
        <nav className='left-menu'>
            <ul>
                <Link className='left-menu__link' to="/dashboard/profile"><li className='left-menu__element'><i className="fas fa-user"></i> Profil</li></Link>
                <Link className='left-menu__link' to="/dashboard/newsfeed"><li className='left-menu__element' ><i className="far fa-newspaper"></i> Journal</li></Link>
                <Link className='left-menu__link' to="/dashboard/settings"><li className='left-menu__element' ><i className="fas fa-cog"></i> Paramètres</li></Link>
                <li className='left-menu__element left-menu__element--no-border' onClick={disconnect}><i className="fas fa-unlink"></i> Déconnexion</li>
            </ul>
        </nav>
    )

}