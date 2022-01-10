import React from 'react';
import Nav from './nav';
import AsideCard from './aside-card';

export default function LeftContainer({ connected }) {
    return (
        <section className='left-container'>
            {connected ?
                <AsideCard />
                : ''}
            <Nav connected={connected} />
        </section>
    )

}