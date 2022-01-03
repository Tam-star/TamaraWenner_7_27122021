import '../sass/App.scss';
import React from 'react';
import Header from '../components/header';
import Connexion from '../components/connexion';
import LeftContainer from '../components/left-container';
import Subscription from '../components/subscription';

function Home() {

  const [login, setLogin] = React.useState(true)

  const changeCenterContainer = event => {
    if (event.target.textContent.includes('Inscription')) {
      setLogin(false)
    }
    else {
      setLogin(true)
    }
  }


  return (
    <div className="App">
      <Header />
      <main className='main-container'>
        <LeftContainer connected={false} changeCenterContainer={changeCenterContainer} />
        {login ? <Connexion /> : <Subscription/>}
        <section className='right-container info'>
          <h2>Pourquoi s'inscrire ?</h2>
          <p>Pour partager du contenu avec tes collègues de GROUPOMANIA</p>
        </section>
      </main>
    </div>
  );
}

export default Home;
