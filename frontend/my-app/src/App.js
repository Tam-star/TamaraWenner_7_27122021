import './sass/App.scss';
import Header from './components/header';
import ContactContainer from './components/contact-container';
import LeftContainer from './components/left-container';
import CenterContainer from './components/center-container';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
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

export default App;
