import React from 'react';
import { getAllUsers } from '../../../API-functions/UserAPI-functions';
import maleAvatar from '../../../assets/male-avatar-profile.jpg';
import Contact from './contact';
import { useUserContext } from '../../../Contexts/UserContext';

export default function ContactContainer() {

    const [userConnected] = useUserContext()
    const [contactList, setContactList] = React.useState([])

    React.useEffect(() =>{
        getAllUsers()
        .then((response) => {
            console.log(response.data)
            setContactList(response.data)
            console.log(contactList)
        })
        .catch((error) => console.log('something is wrong : ', error))
    }, [])



    return (
        <div className='contact-container'>
            <h2>CONTACTS</h2>
            <ul className='contact-list'>
                {contactList.map(contact =>  contact.id===userConnected.id ? 
                '' : <Contact  picture={contact.imageUrl} pseudo={contact.pseudo} key={contact.id} />)}
            </ul>
        </div>
    )

}