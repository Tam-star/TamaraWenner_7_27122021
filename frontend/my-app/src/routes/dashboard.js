import '../sass/App.scss';
import React from 'react';
import Header from '../components/header';
import ContactContainer from '../components/dashboard/contacts/contact-container';
import LeftContainer from '../components/left-container';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import { UserProvider, useUserContext } from '../Contexts/UserContext';
import RightContainer from '../components/right-container';


function Dashboard() {

  return (
    <>
      <UserProvider>
        <Header />
        <main className='main-container'>
          <LeftContainer connected={true} />
          <Outlet />
          <RightContainer connected={true}/>
          {/* <div className='right-container'>
            <h2>CONTACT</h2>
            <ContactContainer />
          </div> */}
        </main>
        <Footer />
      </UserProvider>
    </>
  );
}

export default Dashboard;
