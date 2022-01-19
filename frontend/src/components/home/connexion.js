import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../API-functions/UserAPI-functions'
import { useAuthContext } from '../../Contexts/AuthContext';
import { profileReducer } from '../../reducers';

export default function Connexion() {

    const [state, dispatch] = React.useReducer(profileReducer,
        {
            email: '',
            password: ''
        })

    const navigate = useNavigate();
    const { setAuth } = useAuthContext()
    const message = React.useRef()

    const connect = (event) => {
        event.preventDefault()
        const myRequest = {
            "email": state.email,
            "password": state.password
        }
        login(myRequest)
            .then((response) => {
                if (response.error) {
                    return message.current.innerHTML = `${JSON.stringify(response.error).replace(/"/g, '')}`
                } else if (response.status === 429) {
                    return message.current.innerHTML = `Vous avez atteint le nombre maximum de tentatives fixé à 3. Vous pourrez ré-essayer dans 30 minutes.`
                }
                else {
                    setAuth(true) //On autorise l'accès aux routes suivantes
                    message.current.innerHTML = `Vous êtes connecté. Vous allez être redirigé vers votre dashboard`
                    navigate(`../dashboard/${response.data.userId}/newsfeed`);
                }

            })
            .catch((error) => {
                message.current.innerHTML = `Une erreur s'est produite. Veuillez réessayer ultérieurement`
            })

    }

    return (
        <section className='center-container login-container'>
            <h1>Connexion</h1>
            <p ref={message} className="message"></p>
            <form action="" method="post" onSubmit={connect}>
                <label htmlFor="email">
                    Votre mail :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "email", payload: event.target.value })}
                    type={'email'} id="email" name="email"></input>
                <label htmlFor="password">
                    Votre mot de passe :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "password", payload: event.target.value })}
                    type={'password'} id="password" name="password" ></input>
                <input type="submit" value="Se connecter" ></input>
            </form >
        </section>
    )

}
