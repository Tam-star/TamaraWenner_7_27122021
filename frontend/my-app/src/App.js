import './sass/App.scss';
import Header from './components/header';
import Nav from './components/nav';
import ContactContainer from './components/contact-container';
import maleAvatar from './assets/male-avatar-profile.jpg';


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <article className='left-container'>
          <div className='profile-container'>
            <img src={maleAvatar} className='main-header__avatar' alt='Profil' />
            <p>Alexandre</p>
          </div>
          <Nav />
        </article>
        <div>
          Posts Feed
        </div>
        <div className='right-container'>
          <h2>CONTACT</h2>
          <ContactContainer />
        </div>
      </main>
    </div>
  );
}

export default App;
