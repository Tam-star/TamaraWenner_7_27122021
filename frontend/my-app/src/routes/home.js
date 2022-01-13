import '../sass/App.scss';
import React from 'react';
import Header from '../components/header';
import LeftContainer from '../components/left-container';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import RightContainer from '../components/right-container';

function Home() {

  return (
    <>
      <Header />
      <main className='main-container'>
        <LeftContainer  />
        <Outlet />
        <RightContainer />
      </main>
      <Footer />
    </>
  );
}

export default Home;
