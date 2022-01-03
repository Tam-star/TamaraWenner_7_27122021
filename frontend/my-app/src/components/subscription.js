import React from 'react';
import { signUp } from '../API-functions';

export default function Subscription() {
    
    function redirectToNewsFeed(){
        window.location.href = `./newsfeed`
    }

    const register = (event) => {
        event.preventDefault()
        const myRequest = {
            "lastname": document.getElementById("last-name").value,
            "firstname": document.getElementById("first-name").value,
            "pseudo": document.getElementById("pseudo").value,
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value
        }
        signUp(myRequest).then((response) => {
            console.log(JSON.stringify(response))
            setTimeout(redirectToNewsFeed, 3000);
        })   
    }

    return (
        <section className='center-container login-container'>
            <h1>Inscription</h1>
            <form>
                <label htmlFor="last-name">
                    Votre nom :
                </label>
                <input type={'text'} id="last-name" name="last-name"></input>
                <label htmlFor="first-name">
                    Votre prénom :
                </label>
                <input type={'text'} id="first-name" name="first-name"></input>
                <label htmlFor="email">
                    Votre mail :
                </label>
                <input type={'email'} id="email" name="email"></input>
                <label htmlFor="pseudo">
                    Votre pseudo :
                </label>
                <input type={'text'} id="pseudo" name="pseudo"></input>
                <label htmlFor="password">
                    Votre mot de passe :
                </label>
                <input type={'password'} id="password" name="password" ></input>
                <input type="submit" value="Valider" onClick={register}></input>
            </form>
        </section>
    )

}
