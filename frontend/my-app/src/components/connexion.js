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
                <label htmlFor="password">
                    Votre mot de passe :
                </label>
                <input type={'password'} id="password" name="password" ></input>
                <input type="submit" value="Se connecter"></input>
            </form>
        </section>
    )

}
