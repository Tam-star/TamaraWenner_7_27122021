import '../sass/App.scss';
import React from 'react';
import Header from '../components/header';
import ContactContainer from '../components/contact-container';
import LeftContainer from '../components/left-container';
import { getUserConnectedInfo } from '../API-functions/UserAPI-functions'
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';


function Dashboard() {

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
        <LeftContainer connected={true}  user= {user} />
        <Outlet context={user}/>
        {/* <CenterContainer centerElement={centerState} user={user} /> */}
        <div className='right-container'>
          <h2>CONTACT</h2>
          <ContactContainer />
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Dashboard;
