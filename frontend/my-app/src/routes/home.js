import '../sass/App.scss';
import React from 'react';
import Header from '../components/header';
import LeftContainer from '../components/left-container';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';

function Home() {

  return (
    <div className="App">
      <Header />
      <main className='main-container'>
        <LeftContainer connected={false} />
        <Outlet/>
        <section className='right-container info'>
          <h2>Pourquoi s'inscrire ?</h2>
          <p>Pour partager du contenu avec tes collègues de GROUPOMANIA</p>
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default Home;
