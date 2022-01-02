import '../sass/App.scss';
import Header from '../components/header';
import Nav from '../components/nav';
import ContactContainer from '../components/contact-container';
import maleAvatar from '../assets/male-avatar-profile.jpg';


function Home() {
  return (
    <div className="App">
      <Header />
      <main>
        <article className='left-container'>
          <Nav />
        </article>
        <div>
          Home
        </div>
        <div className='right-container'>
          <h2>CONTACT</h2>
          <ContactContainer />
        </div>
      </main>
    </div>
  );
}

export default Home;
