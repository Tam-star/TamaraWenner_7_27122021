import '../sass/App.scss';
import React from 'react';
import Header from '../components/header';
import ContactContainer from '../components/contact-container';
import CenterContainer from '../components/center-container';
import LeftContainer from '../components/left-container';
import NewPost from '../components/newpost';
import PostContainer from '../components/post-container';
import ProfileContainer from '../components/profile-container';
import { getAllPosts } from '../API-functions'


function NewsFeed() {

  const [centerState, setCenterState] = React.useState(
    <>
      <NewPost />
      <PostContainer />
    </>)



  const changeCenterContainer = event => {
    if (event.target.textContent.includes('Profil')) {
      setCenterState(<ProfileContainer />)
    }
    else if (event.target.textContent.includes('Journal')) {
      setCenterState(<>
        <NewPost />
        <PostContainer />
      </>)
    }
    else {
      console.log("lien non encore valide")
    }
  }


  return (
    <div className="App">
      <Header />
      <main className='main-container'>
        <LeftContainer connected={true} changeCenterContainer={changeCenterContainer} />
        <CenterContainer element={centerState} />
        <div className='right-container'>
          <h2>CONTACT</h2>
          <ContactContainer />
        </div>
      </main>
    </div>
  );
}

export default NewsFeed;
