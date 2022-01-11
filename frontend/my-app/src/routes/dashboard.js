import '../sass/App.scss';
import React from 'react';
import Header from '../components/header';
import ContactContainer from '../components/contact-container';
import LeftContainer from '../components/left-container';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';


function Dashboard() {

  return (
    <>
      <Header />
      <main className='main-container'>
        <LeftContainer connected={true} />
        <Outlet />
        <div className='right-container'>
          <h2>CONTACT</h2>
          <ContactContainer />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
