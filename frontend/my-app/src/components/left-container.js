import React from 'react';
import AsideCard from './dashboard/aside-card';
import UserNav from './dashboard/user-nav';
import HomeNav from './home/home-nav';

export default function LeftContainer({ connected }) {
    return (
        <section className='left-container'>
            {connected ?
                <>
                    <AsideCard />
                    <UserNav />
                </>
                :  <HomeNav />}
        </section>
    )

}