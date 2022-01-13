import '../sass/App.scss';
import React from 'react';
import Header from '../components/header';
import LeftContainer from '../components/left-container';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import { UserProvider } from '../Contexts/UserContext';
import RightContainer from '../components/right-container';


function Dashboard() {

  return (
    <>
      <UserProvider>
        <Header connected={true}/>
        <main className='main-container'>
          <LeftContainer connected={true} />
          <Outlet />
          <RightContainer connected={true}/>
        </main>
        <Footer />
      </UserProvider>
    </>
  );
}

export default Dashboard;
