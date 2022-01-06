import '../sass/App.scss';
import React from 'react';
import Header from '../components/header';
import ContactContainer from '../components/contact-container';
import CenterContainer from '../components/center-container';
import LeftContainer from '../components/left-container';
import { getUserConnectedInfo, logout } from '../API-functions'


function NewsFeed() {

  const [centerState, setCenterState] = React.useState('journal')

  const changeCenterContainer = event => {
    if (event.target.textContent.includes('Profil')) {
      setCenterState('profil')
    }
    else if (event.target.textContent.includes('Journal')) {
      setCenterState('journal')
    }
    else if (event.target.textContent.includes('Déconnexion')){
      logout()
      .then((data) => {
        console.log('data from logout : ',data)
        window.location.href = `./home`
      })
    }
    else {
      console.log("lien non encore valide")
    }
  }

  const [user, setUser] = React.useState([])

  React.useEffect(() => {
    getUserConnectedInfo()
    .then((response) => {
        setUser(response.data)
        console.log('useEffect used : '+ JSON.stringify(response.data))
    })
    .catch((error) => console.error(error))
  }, [])

  return (
    <div className="App">
      <Header />
      <main className='main-container'>
        <LeftContainer connected={true} changeCenterContainer={changeCenterContainer} user= {user} />
        <CenterContainer centerElement={centerState} user={user} />
        <div className='right-container'>
          <h2>CONTACT</h2>
          <ContactContainer />
        </div>
      </main>
    </div>
  );
}

export default NewsFeed;
