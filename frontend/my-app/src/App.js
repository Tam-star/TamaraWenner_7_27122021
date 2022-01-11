import './sass/App.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./routes/home"
import reportWebVitals from './reportWebVitals';
import Subscription from './components/home/subscription';
import Connexion from './components/home/connexion';
import Dashboard from './routes/dashboard';
import CenterContainer from './components/center-container';
import Welcome from './components/home/welcome';
import { UserProvider } from './UserContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route index element={<Welcome />} />
            <Route path="signup" element={<Subscription />} />
            <Route path="login" element={<Connexion />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} >
            <Route path="/dashboard/profile" element={<CenterContainer centerElement='profil' />} />
            <Route path="/dashboard/newsfeed" element={<CenterContainer centerElement='newsfeed' />} />
            <Route path="/dashboard/settings" element={<CenterContainer centerElement='settings' />} />
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
