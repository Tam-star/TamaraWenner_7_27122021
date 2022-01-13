import React from 'react';
import ContactContainer from './dashboard/contacts/contact-container';

export default function RightContainer({ connected }) {
    return (
        <section className='right-container'>
            {connected ?
                <>
                    <ContactContainer />
                </>
                : <div className='info'>
                    <h2>Pourquoi s'inscrire ?</h2>
                    <p>Pour partager du contenu avec tes collègues de GROUPOMANIA</p>
                </div> }
        </section>
    )

}