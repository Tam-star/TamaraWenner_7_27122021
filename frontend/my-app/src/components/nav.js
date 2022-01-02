import React from 'react';

export default function Nav() {
    return (
        <nav className='menu'>
            <ul>
                <li><i className="fas fa-home"></i> Home</li>
                <li><i className="fas fa-user-friends"></i> People</li>
                <li><i className="fas fa-images"></i> Photos</li>
                <li><i className="far fa-newspaper"></i> News Feed</li>
                <li><i className="fas fa-user"></i> Profile</li>
                <li><i className="fas fa-cog"></i> Settings</li>
            </ul>
        </nav>
    )

}