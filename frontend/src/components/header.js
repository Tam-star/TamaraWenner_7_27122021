import React from 'react';
import { useThemeContext } from '../Contexts/ThemeContext';
import darkLogo from '../assets/header_icon_darkmode.svg'
import lightLogo from '../assets/header_icon_lightmode.svg'

export default function Header({ connected = false }) {

    const [mode] = useThemeContext()

    return (
        <header className={mode==='dark' ? 'main-header main-header--dark' :'main-header'}>
            <img src={mode==='dark' ? darkLogo : lightLogo} className='main-header__logo' alt='Groupomania logo'/> 
        </header>
    )

}