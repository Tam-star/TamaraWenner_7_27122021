import React from 'react';
import { signUp } from '../../API-functions/UserAPI-functions';
import { profileReducer } from '../../reducers'


export default function Subscription() {

    const [state, dispatch] = React.useReducer(profileReducer,
        {
            lastname: '',
            firstname: '',
            pseudo: '',
            email: '',
            password: ''
        })

    const minLengthRegex = new RegExp("(?=.{8,})")
    const numberRegex = new RegExp("(?=.*[0-9])")
    const lowerCaseRegex = new RegExp("(?=.*[a-z])")
    const upperCaseRegex = new RegExp("(?=.*[A-Z])")
    const specialCharRegex = new RegExp("(?=.*[!@#$%^§&*])")

    const minLengthRef = React.useRef()
    const numberRef = React.useRef()
    const lowerCaseRef = React.useRef()
    const upperCaseRef = React.useRef()
    const specialCharRef = React.useRef()

    const regexArray = [minLengthRegex, numberRegex, lowerCaseRegex, upperCaseRegex, specialCharRegex]
    const refArray = [minLengthRef, numberRef, lowerCaseRef, upperCaseRef, specialCharRef]

    const message = React.useRef()

    const handlePassword = (event) => {
        dispatch({ type: "password", payload: event.target.value })
        for (let i = 0; i < regexArray.length; i++) {
            if (regexArray[i].test(event.target.value)) {
                refArray[i].current.style.color = "green"
            } else {
                refArray[i].current.style.color = "#0c2246"
            }
        }
    }

    const register = (event) => {
        event.preventDefault()
        const myRequest = {
            "lastname": state.lastname,
            "firstname": state.firstname,
            "pseudo": state.pseudo,
            "email": state.email,
            "password": state.password
        }
        signUp(myRequest)
            .then((response) => {
                if (response.error) {
                    return message.current.innerHTML = `Nous n'avons pas pu vous inscrire : </br>${JSON.stringify(response.error).replace(/"/g, '').replace(/\\n/g, '</br>')}`
                }
                message.current.innerHTML = `${JSON.stringify(response.message).replace(/"/g, '')} </br> Vous pouvez désormais vous connecter à votre compte via l'onglet Connexion`
            })
            .catch(error => {
                return message.current.innerHTML = `Une erreur s'est produite. Veuillez réessayer ultérieurement`
            })
    }

    return (
        <section className='center-container signup-container'>
            <h1>Inscription</h1>
            <p ref={message} className="message"></p>
            <form action="" method="post" onSubmit={register}>
                <label htmlFor="last-name">
                    Votre nom :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "lastname", payload: event.target.value })}
                    type={'text'} id="last-name" name="last-name" required></input>
                <label htmlFor="first-name">
                    Votre prénom :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "firstname", payload: event.target.value })}
                    type={'text'} id="first-name" name="first-name" required></input>
                <label htmlFor="email">
                    Votre mail :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "email", payload: event.target.value })}
                    type={'email'} id="email" name="email" required></input>
                <label htmlFor="pseudo">
                    Votre pseudo :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "pseudo", payload: event.target.value })}
                    type={'text'} id="pseudo" name="pseudo" required></input>
                <label htmlFor="password">
                    Votre mot de passe :
                </label>
                <input onChange={handlePassword}
                    type={'password'} id="password" name="password" required></input>
                <div className='password-rules'>
                    <p ref={minLengthRef}>Au moins 8 caractères</p>
                    <p ref={lowerCaseRef}>Au moins une lettre minuscule</p>
                    <p ref={upperCaseRef}>Au moins une lettre majuscule</p>
                    <p ref={specialCharRef}>Au moins un caratère spécial</p>
                    <p ref={numberRef}>Au moins 1 chiffre</p>
                </div>

                <input type="submit" value="Valider"></input>

            </form>
        </section>
    )

}
