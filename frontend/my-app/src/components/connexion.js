import React from 'react';

export default function Connexion() {
    return (
        <section className='center-container login-container'> 
            <h1>Connexion</h1>
            <form>
                <label htmlFor="email">
                    Votre mail : 
                </label>
                <input type={'email'} id="email" name="email"></input>
                <label>
                    Votre mot de passe : 
                </label>
                <input htmlFor="password" type={'password'}></input>
                <input type="submit" id="password" name="password" value="Se connecter"></input>
            </form>
        </section>
    )

}
