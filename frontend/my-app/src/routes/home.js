import '../sass/App.scss';
import Header from '../components/header';
import Connexion from '../components/connexion';


function Home() {
  return (
    <div className="App">
      <Header />
      <main className='main-container'>
        <Connexion/>
      </main>
    </div>
  );
}

export default Home;
