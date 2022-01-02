import React from 'react';

export default function Nav() {
    return (
        <nav className='menu'>
            <ul>
                <li><i class="fas fa-home"></i> Home</li>
                <li><i class="fas fa-user-friends"></i> People</li>
                <li><i class="fas fa-images"></i> Photos</li>
                <li><i class="far fa-newspaper"></i> News Feed</li>
                <li><i class="fas fa-user"></i> Profile</li>
                <li><i class="fas fa-cog"></i> Settings</li>
            </ul>
        </nav>
    )

}