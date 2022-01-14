import React from 'react';
import Modal from 'react-modal';
import {  updateUserWithFormData, updateUserWithJSON } from '../../../API-functions/UserAPI-functions';
import { useThemeContext } from '../../../Contexts/ThemeContext';
import { useUserContext } from '../../../Contexts/UserContext';


Modal.setAppElement('#root');

function reducer(state, action) {
    switch (action.type) {
        case 'lastname':
            return { ...state, lastname: action.payload }
        case 'firstname':
            return { ...state, firstname: action.payload };
        case 'pseudo':
            return { ...state, pseudo: action.payload };
        case 'bio':
            return { ...state, bio: action.payload };
        case 'password':
            return { ...state, password: action.payload };
        default:
            throw new Error("Cette action n'est pas prévue")
    }
}

export default function ProfileChange({ handleClick }) {

    const [mode] = useThemeContext()
    const [user, handleUser] = useUserContext()
    const [picture, setPicture] = React.useState(user.imageUrl)
    const [state, dispatch] = React.useReducer(reducer,
        {
            lastname: user.lastname,
            firstname: user.firstname,
            pseudo: user.pseudo,
            bio: user.bio,
            password: ''
        })
    const fileInput = React.useRef()

    const handleFileChange = event => {
        const [file] = fileInput.current.files
        if (file) {
            setPicture(URL.createObjectURL(file))
        }
    }

    const handleFileRemove = event => {
        event.preventDefault()
        fileInput.current.value = ""
        setPicture(null)
    }

    const handleUpdateUser = event => {
        event.preventDefault()
        if (fileInput.current.files[0]) {
            const formData = new FormData();
            formData.append(
                "user",
                `{"lastname" : "${state.lastname}", "firstname" : "${state.firstname}","pseudo" : "${state.pseudo}","bio" : "${state.bio}"${state.password !== "" ? `,"password" : "${state.password}"` : ''}}`);
            formData.append('image', fileInput.current.files[0], fileInput.current.files[0].name)
            updateUserWithFormData(formData, user.id).then(() => {
                handleClick(event)  //Close the modify-profile container
                handleUser()
                console.log('profile updated')
            })
        }
        else {
            let request = {}
            if (picture) {
                request = state.password !== "" ? { ...state } :
                    {
                        lastname: state.lastname,
                        firstname: state.firstname,
                        pseudo: state.pseudo,
                        bio: state.bio,
                    }
            } else {
                request = state.password !== "" ? {
                    ...state,
                    imageUrl: null
                } :
                    {
                        lastname: state.lastname,
                        firstname: state.firstname,
                        pseudo: state.pseudo,
                        bio: state.bio,
                        imageUrl: null
                    }
            }
            updateUserWithJSON(request, user.id).then(() => {
                handleClick(event) //close the modify-profile container
                handleUser()
                console.log('profile updated')
            })
        }
    }

    return (
        <section className={ mode==='dark' ? 'profile-change profile-change--dark' :'profile-change'}>
            <i className="fas fa-times profile-change__icon" onClick={handleClick}></i>
            <h2>Modifier votre profil</h2>
            <p className='no-allowed-change' title='Vous ne pouvez pas modifier votre email'>Email :  {user.email}</p>
            <form className='profile-change__form' action="" method="post" >
                <div className='profile-change__form__picture' >
                    <div>
                        <label htmlFor="imageInput">Modifier votre photo de profil : </label>
                        <input type="file" id="imageInput" name="imageInput" accept="image/png, image/gif, image/jpeg" ref={fileInput} onChange={handleFileChange}></input>
                        {picture ? <img src={picture} alt='Photo de profil chargée' /> : ''}
                        {picture ? <button onClick={handleFileRemove}>Supprimer l'image</button> : ''}
                    </div>
                </div>
                <label htmlFor="last-name">
                    Votre nom :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "lastname", payload: event.target.value })
                } type={'text'} id="last-name" name="last-name" value={state.lastname}></input>
                <label htmlFor="first-name">
                    Votre prénom :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "firstname", payload: event.target.value })}
                    type={'text'} id="first-name" name="first-name" value={state.firstname}></input>
                <label htmlFor="pseudo">
                    Votre pseudo :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "pseudo", payload: event.target.value })}
                    type={'text'} id="pseudo" name="pseudo" value={state.pseudo}></input>
                <label htmlFor="pseudo">
                    Parlez nous un peu de vous :
                </label>
                <textarea onChange={(event) =>
                    dispatch({ type: "bio", payload: event.target.value })}
                    name="textarea" rows="7" value={state.bio}></textarea>
                <label htmlFor="password">
                    Votre mot de passe :
                </label>
                <input onChange={(event) =>
                    dispatch({ type: "password", payload: event.target.value })}
                    type={'password'} id="password" name="password" value={state.password}></input>
                <input onClick={handleUpdateUser} id='monbouton' className='profile-change__form__submit' type="submit" value="Valider"></input>
            </form>

        </section>
    )
}