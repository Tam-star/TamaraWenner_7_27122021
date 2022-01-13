import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../../Contexts/ThemeContext';

export default function HomeNav() {

    const [mode] = useThemeContext()

    return (
        <nav className={mode === 'dark' ? 'left-menu left-menu--dark' : 'left-menu'}>
            <ul>
                <Link className={mode === 'dark' ? 'left-menu__link left-menu__link--dark' : 'left-menu__link'} to="/">
                    <li className={mode === 'dark' ? 'left-menu__element left-menu__element--dark' : 'left-menu__element'}>
                        <i className="fas fa-home"></i> Home
                    </li>
                </Link>
                <Link className={mode === 'dark' ? 'left-menu__link left-menu__link--dark' : 'left-menu__link'} to="/signup">
                    <li className={mode === 'dark' ? 'left-menu__element left-menu__element--dark' : 'left-menu__element'}>
                        <i className="fas fa-id-badge"></i> Inscription
                    </li>
                </Link>
                <Link className={mode === 'dark' ? 'left-menu__link left-menu__link--dark' : 'left-menu__link'} to="/login">
                    <li className={mode==='dark' ? 'left-menu__element left-menu__element--dark left-menu__element--no-border':'left-menu__element left-menu__element--no-border'} ><i className="fas fa-link"></i> Connexion</li>
                </Link>
            </ul>
        </nav>
    )

}