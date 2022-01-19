import React from 'react';
import { useThemeContext } from '../Contexts/ThemeContext';
import ContactContainer from './dashboard/contacts/contact-container';

export default function RightContainer({ connected = false }) {

    const [mode] = useThemeContext()

    return (
        <section className='right-container'>
            {connected ?
                <>
                    <ContactContainer />
                </>
                : <div className={mode === 'dark' ? 'info info--dark' : 'info'}>
                    <h2>Pourquoi s'inscrire ?</h2>
                    <p>Pour partager du contenu avec tes collègues de GROUPOMANIA</p>
                </div>}
        </section>
    )

}