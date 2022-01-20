import logo from '../../assets/icon-transparent-blue.svg';
import React from 'react';

export default function ErrorContainer({ errorStatus = 404 }) {

    //const[errorStatus, setErrorStatus] = React.useState(404)

    return (
        <section className='center-container error-container'>
            <div className='error-container__title'>
                <p>ERREUR</p>
                <div className='error-container__title__number'>

                    {errorStatus === 404 ?
                        <>
                            <p>4</p><img className='error-container__title__number__logo' src={logo} alt='0'></img><p>4</p>
                        </> : ''}
                    {errorStatus === 500 ?
                        <>
                            <p>5</p><img className='error-container__title__number__logo' src={logo} alt='0'></img><p>0</p>
                        </> : ''}

                </div>
            </div>
            <p>Nous sommes navrés de vous informer que le réseau social Groupomania est actuellement indisponible. <br/> 
            Nos équipes travaillent actuellement à la résolution de ce problème.</p>
        </section>
    )
}