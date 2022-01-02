import '../sass/App.scss';
import Header from '../components/header';
import ContactContainer from '../components/contact-container';
import CenterContainer from '../components/center-container';
import LeftContainer from '../components/left-container';


function NewsFeed() {
  return (
    <div className="App">
      <Header />
      <main className='main-container'>
        <LeftContainer/>
        <CenterContainer/>
        <div className='right-container'>
          <h2>CONTACT</h2>
          <ContactContainer />
        </div>
      </main>
    </div>
  );
}

export default NewsFeed;
