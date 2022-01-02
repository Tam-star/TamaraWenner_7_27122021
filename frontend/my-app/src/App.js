import './sass/App.scss';
import Header from './components/header';
import Nav from './components/nav';
import ContactContainer from './components/contact-container';

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Nav/>
        <div>
          Posts Feed
        </div>
        <ContactContainer/>
      </main>
    </div>
  );
}

export default App;
