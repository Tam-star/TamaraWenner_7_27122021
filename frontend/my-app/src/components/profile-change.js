import React from 'react';
import maleAvatar from '../assets/male-avatar-profile.jpg';

export default function ProfileChange({ user, handleClick }) {

    const [picture, setPicture] = React.useState()

    const handleFileChange = event => {
        const [file] = document.getElementById('imageInput').files
        if (file) {
            setPicture(URL.createObjectURL(file))
        }
    }

    const handleFileRemove = event => {
        event.preventDefault()
        document.getElementById('imageInput').value = ""
        setPicture(null)
    }

    return (
        <section className='profile-change'>
            <i className="fas fa-times profile-change__icon" onClick={handleClick}></i>
            <h2>Modifier votre profil</h2>
            <p className='no-allowed-change' title='Vous ne pouvez pas modifier votre email'>Email :  {user.email}</p>
            <form className='profile-change__form' action="" method="post" >
                <div className='profile-change__form__picture' >
                    <img src={maleAvatar} alt='Profil' />
                    <div>
                        <label htmlFor="imageInput">Modifier votre photo de profil : </label>
                        <input type="file" id="imageInput" name="imageInput" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange}></input>
                        {picture ? <img src={picture} alt='Photo de profil chargée' /> : ''}
                        {picture ?  <button onClick={handleFileRemove}>Supprimer l'image</button> : ''}
                    </div>
                </div>
                <label htmlFor="last-name">
                    Votre nom :
                </label>
                <input type={'text'} id="last-name" name="last-name" placeholder={user.lastname}></input>
                <label htmlFor="first-name">
                    Votre prénom :
                </label>
                <input type={'text'} id="first-name" name="first-name" placeholder={user.firstname}></input>
                <label htmlFor="pseudo">
                    Votre pseudo :
                </label>
                <input type={'text'} id="pseudo" name="pseudo" placeholder={user.pseudo}></input>
                <label htmlFor="pseudo">
                    Parlez nous un peu de vous :
                </label>
                <textarea name="textarea" rows="7" ></textarea>
                <label htmlFor="password">
                    Votre mot de passe :
                </label>
                <input type={'password'} id="password" name="password" ></input>
                <input id='monbouton' className='profile-change__form__submit' type="submit" value="Valider"></input>
            </form>

        </section>
    )
}