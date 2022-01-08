import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./routes/home"
import reportWebVitals from './reportWebVitals';
import Subscription from './components/subscription';
import Connexion from './components/connexion';
import Dashboard from './routes/dashboard';
import CenterContainer from './components/center-container';
import Welcome from './components/welcome';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} >
        <Route index element={ <Welcome /> } />
        <Route path="signup" element={<Subscription />} />
        <Route path="login" element={<Connexion />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} >
        <Route path="/dashboard/profile" element={<CenterContainer centerElement='profil' />} />
        <Route path="/dashboard/newsfeed" element={<CenterContainer centerElement='newsfeed' />} />
        <Route path="/dashboard/settings" element={<div>Ici seront les settings</div>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
