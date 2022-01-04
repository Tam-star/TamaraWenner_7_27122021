import React from 'react';
import { login } from '../API-functions'
import { redirectToNewsFeed } from '../functions';

export default function Connexion() {

    const connect = (event) => {
        event.preventDefault()
        const myRequest = {
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value
        }
        login(myRequest)
        .then((response) => {
            if(response.error){
                return document.getElementsByClassName("message")[0].innerHTML = `${JSON.stringify(response.error).replace(/"/g, '')}`
            }
            document.getElementsByClassName("message")[0].innerHTML = `Vous êtes connecté`
            console.log('my token : '+ JSON.stringify(response.token))
            sessionStorage.setItem('groupomania-userId', JSON.stringify(response.userId).replace(/"/g, ''));
            sessionStorage.setItem('groupomania-token', JSON.stringify(response.token).replace(/"/g, ''));
            //Just for development, it will redirect directly for production
            setTimeout(redirectToNewsFeed, 3000);
        })
        .catch((error) => {
            document.getElementsByClassName("message")[0].innerHTML = `Une erreur s'est produite : ${error}`
        })

    }

    return (
        <section className='center-container login-container'>
            <h1>Connexion</h1>
            <p className="message"></p>
            <form action="" method="post" onSubmit={connect}>
                <label htmlFor="email">
                    Votre mail :
                </label>
                <input type={'email'} id="email" name="email"></input>
                <label htmlFor="password">
                    Votre mot de passe :
                </label>
                <input type={'password'} id="password" name="password" ></input>
                <input type="submit" value="Se connecter" ></input>
            </form >
        </section>
    )

}
