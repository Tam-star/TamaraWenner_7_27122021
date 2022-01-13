import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../API-functions/UserAPI-functions'
import { useAuthContext } from '../../Contexts/AuthContext';
//import { redirectToNewsFeed } from '../functions';

export default function Connexion() {

    const navigate = useNavigate();
    const {setAuth} = useAuthContext()


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
            setAuth(true) //On autorise l'accès aux routes suivantes
            document.getElementsByClassName("message")[0].innerHTML = `Vous êtes connecté. Vous allez être redirigé vers votre dashboard`
            //console.log('my message : '+ JSON.stringify(response.message))
            console.log('my data:' +JSON.stringify(response.data))
            navigate(`../dashboard/${response.data.userId}/newsfeed`);
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
