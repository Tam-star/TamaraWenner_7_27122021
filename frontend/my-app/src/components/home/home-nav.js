import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeNav() {

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