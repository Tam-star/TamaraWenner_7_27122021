import React from 'react';

export default function Nav() {
    return (
        <nav className='menu'>
            <ul>
                <li className='menu__element'><i className="fas fa-home"></i> Home</li>
                <li className='menu__element'><i className="fas fa-user-friends"></i> People</li>
                <li className='menu__element'><i className="fas fa-images"></i> Photos</li>
                <li className='menu__element'><i className="far fa-newspaper"></i> News Feed</li>
                <li className='menu__element'><i className="fas fa-user"></i> Profile</li>
                <li className='menu__element menu__element--no-border'><i className="fas fa-cog"></i> Settings</li>
            </ul>
        </nav>
    )

}