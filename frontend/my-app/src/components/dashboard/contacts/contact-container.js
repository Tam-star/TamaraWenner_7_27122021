import React from 'react';
import { getAllUsers } from '../../../API-functions/UserAPI-functions';
import maleAvatar from '../../../assets/male-avatar-profile.jpg';
import Contact from './contact';
import { useUserContext } from '../../../Contexts/UserContext';
import { useThemeContext } from '../../../Contexts/ThemeContext';

export default function ContactContainer() {

    const [mode] = useThemeContext()
    const [userConnected] = useUserContext()
    const [contactList, setContactList] = React.useState([])

    React.useEffect(() => {
        getAllUsers()
            .then((response) => {
                setContactList(response.data)
            })
            .catch((error) => console.log('something is wrong : ', error))
    }, [])



    return (
        <div className={mode === 'dark' ? 'contact-container contact-container--dark' : 'contact-container'}>
            <h2>CONTACTS</h2>
            <ul className='contact-list'>
                {contactList.map(contact => contact.id === userConnected.id ?
                    '' : <Contact contact={contact} key={contact.id} />)}
            </ul>
        </div>
    )

}