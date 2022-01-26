import React from 'react';
import maleAvatar from '../../../assets/male-avatar-profile.jpg';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Contact({ contact }) {


    //Showing Profile
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <>
            {/* Se déclenche lorsque l'on appuie sur le contact */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={'show-profile-modal'} >
                <i className="fas fa-times modal-close-icon" onClick={closeModal}></i>
                <h2>{contact.pseudo}</h2>
                <img src={contact.imageUrl ? contact.imageUrl : maleAvatar} alt={`Profil de ${contact.pseudo}`} />
                <p><span className='show-profile-modal__title'>Prénom : </span>{contact.firstname} </p>
                <p><span className='show-profile-modal__title'>Nom : </span>{contact.lastname} </p>
                <p><span className='show-profile-modal__title'>Bio : </span> {contact.bio} </p>
            </Modal>
            <li tabIndex="0" className='contact' onKeyUp={(event) => { if (event.code === 'Enter') openModal() }} onClick={openModal}>
                <img src={contact.imageUrl ? contact.imageUrl : maleAvatar} alt={`Profil de ${contact.pseudo}`} />
                <span className='contact__pseudo'>{contact.pseudo}</span>
            </li>
        </>

    )

}