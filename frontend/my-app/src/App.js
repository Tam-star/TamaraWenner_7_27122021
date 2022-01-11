import './sass/App.scss';
import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import Home from "./routes/home";
import Subscription from './components/home/subscription';
import Connexion from './components/home/connexion';
import Dashboard from './routes/dashboard';
import CenterContainer from './components/center-container';
import Welcome from './components/home/welcome';
import { AuthProvider, RequireAuth } from './Contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route index element={<Welcome />} />
            <Route path="signup" element={<Subscription />} />
            <Route path="login" element={<Connexion />} />
          </Route>
          <Route path="dashboard/:userId"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>} >
            <Route path="profile" element={<CenterContainer centerElement='profil' />} />
            <Route path="newsfeed" element={<CenterContainer centerElement='newsfeed' />} />
            <Route path="settings" element={<CenterContainer centerElement='settings' />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
