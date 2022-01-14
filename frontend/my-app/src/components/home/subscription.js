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

    const register = (event) => {
        event.preventDefault()
        const myRequest = {
            "lastname": state.lastname,
            "firstname": state.firstname,
            "pseudo": state.pseudo,
            "email": state.email,
            "password": state.password
        }
        signUp(myRequest).then((response) => {
            if (response.error) {
                return document.getElementsByClassName("message")[0].innerHTML = `Nous n'avons pas pu vous inscrire : </br>${JSON.stringify(response.error).replace(/"/g, '')}`
            }
            document.getElementsByClassName("message")[0].innerHTML = `${JSON.stringify(response.message).replace(/"/g, '')} </br> Vous pouvez désormais vous connecter à votre compte`

        })
    }

    return (
        <section className='center-container signup-container'>
            <h1>Inscription</h1>
            <p className="message"></p>
            <form action="" method="post" onSubmit={register}>
                <label htmlFor="last-name">
                    Votre nom :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "lastname", payload: event.target.value })}
                    type={'text'} id="last-name" name="last-name"></input>
                <label htmlFor="first-name">
                    Votre prénom :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "firstname", payload: event.target.value })}
                    type={'text'} id="first-name" name="first-name"></input>
                <label htmlFor="email">
                    Votre mail :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "email", payload: event.target.value })}
                    type={'email'} id="email" name="email"></input>
                <label htmlFor="pseudo">
                    Votre pseudo :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "pseudo", payload: event.target.value })}
                    type={'text'} id="pseudo" name="pseudo"></input>
                <label htmlFor="password">
                    Votre mot de passe :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "password", payload: event.target.value })}
                    type={'password'} id="password" name="password" ></input>
                <input type="submit" value="Valider"></input>
            </form>
        </section>
    )

}
