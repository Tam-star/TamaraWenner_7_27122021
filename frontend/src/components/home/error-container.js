import logo from '../../assets/icon-transparent-blue.svg';
import React from 'react';

export default function ErrorContainer() {

    return (
        <section className='center-container error-container'>
            <div className='error-container__title'>
                <p>ERREUR</p>
                <div className='error-container__title__number'>
                    <p>4</p><img className='error-container__title__number__logo' src={logo} alt='0'></img><p>4</p>
                </div>
            </div>
            <p>La page que vous recherchez n'existe pas</p>
        </section>
    )
}