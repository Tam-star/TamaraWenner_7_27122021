import React from 'react';

export default function Nav() {
    return (
        <nav className='menu'>
            <ul>
                <li className='menu__element'><i className="fas fa-home"></i> Home</li>
                <li className='menu__element'><i className="fas fa-user-friends"></i> People</li>
                <li className='menu__element'><i className="fas fa-images"></i> Photos</li>
                <li className='menu__element'><i className="far fa-newspaper"></i> Journal</li>
                <li className='menu__element'><i className="fas fa-user"></i> Profil</li>
                <li className='menu__element'><i className="fas fa-cog"></i> Paramètres</li>
                <li className='menu__element menu__element--no-border'><i class="fas fa-unlink"></i> Déconnexion</li>
            </ul>
        </nav>
    )

}