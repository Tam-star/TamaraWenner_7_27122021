import React from 'react';
import Switch from 'react-switch';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../API-functions/UserAPI-functions';
import { deletePost, getAllPostsOfUser } from '../../../API-functions/PostAPI-functions';
import { useUserContext } from '../../../Contexts/UserContext';
import { useThemeContext } from '../../../Contexts/ThemeContext';

export default function SettingsContainer() {
  
    const navigate = useNavigate();
    const [mode, setMode] = useThemeContext()
    const [user] = useUserContext()
    //Switch Light Mode / Dark Mode
    const [checked, setChecked] = React.useState(mode==='light' ? false : true);
    const handleChange = nextChecked => {
        setChecked(nextChecked);
        if (checked) {
            setMode('light')
            localStorage.setItem('mode', 'light');
        } else {
            setMode('dark')
            localStorage.setItem('mode', 'dark');
        }
    };

    //Deleting User
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const handleDeleteUser = (event) => {
        getAllPostsOfUser(user.id)
            .then((response) => {
                response.data.map(post => deletePost(post.id))
                console.log('tous les posts de l utilisateur ont été supprimés')
                deleteUser(user.id).then(() => {
                    console.log('cookie d authentification supprimé')
                    navigate("../../");
                })

            })
    }
    return (
        <section className={mode==='dark' ? 'settings-container settings-container--dark' :  'settings-container'}>
            <h2>Paramètres</h2>
            <h3>Mode</h3>
            <p>Light Mode / Dark Mode</p>
            <Switch
                onChange={handleChange}
                onColor="#000000"
                offColor='#e6e6e6'
                onHandleColor="#e6e6e6"
                offHandleColor="#ffffff"
                checked={checked}
                className="react-switch"
                height={40}
                width={180}
                uncheckedIcon={
                    <div className='react-switch__uncheckedIcon react-switch__mode'>
                        Light Mode
                    </div>
                }
                checkedIcon={
                    <div className='react-switch__checkedIcon react-switch__mode'>
                        Dark Mode
                    </div>
                }
                uncheckedHandleIcon={
                    <svg className='react-switch__HandleIcon' viewBox="0 0 10 10" >
                        <circle r={3} cx={5} cy={5} />
                    </svg>
                }
                checkedHandleIcon={
                    <svg className='react-switch__HandleIcon' viewBox="0 0 10 10" >
                        <circle r={3} cx={5} cy={5} />
                    </svg>
                }
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={'delete-modal'}
            >
                <i className="fas fa-times profile-change__icon" onClick={closeModal}></i>
                <h2 style={{ color: 'red' }}>Supprimer votre compte</h2>
                <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                <p>Toutes vos données et vos posts seront perdus.</p>
                <div>
                    <button onClick={handleDeleteUser}>Oui</button>
                    <button onClick={closeModal}>Non</button>
                </div>
            </Modal>
            <h3>Suppression du compte</h3>
            <button onClick={openModal}>Je souhaite supprimer mon compte définitivement</button>
        </section>
    )
}

