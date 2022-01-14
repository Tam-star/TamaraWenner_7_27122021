import React from 'react';
import { useThemeContext } from '../Contexts/ThemeContext';
import SearchBar from './dashboard/searchbar';

export default function Header({ connected = false }) {

    const [mode] = useThemeContext()

    return (
        <header className={mode==='dark' ? 'main-header main-header--dark' :'main-header'}>
            {/* <img src={logo} className='main-header__logo' /> */}
            <div className={mode==='dark' ? 'main-header__logo main-header__logo--dark' :'main-header__logo'}></div>
            {/* {connected ?
                <SearchBar />
                : ''} */}

        </header>
    )

}