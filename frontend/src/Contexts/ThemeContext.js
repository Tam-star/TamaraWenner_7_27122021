import React from 'react';
import { useParams } from "react-router-dom";
import { getUserInfo } from '../API-functions/UserAPI-functions';

export const ThemeContext = React.createContext()

export function useThemeContext() {
  return React.useContext(ThemeContext);
}

export const ThemeProvider = (props) => {

  const savedMode = localStorage.getItem('mode')  
  const [mode, setMode] = React.useState( savedMode ? savedMode : 'light' )

  return (
    <ThemeContext.Provider value={[mode, setMode]}>
      {props.children}
    </ThemeContext.Provider>
  )
}