import React from 'react';
import { useParams } from "react-router-dom";
import { getUserInfo } from '../API-functions/UserAPI-functions';

export const UserContext = React.createContext()

export function useUserContext() {
  return React.useContext(UserContext);
}

export const UserProvider = (props) => {
  const [user, setUser] = React.useState('')
  const params = useParams()


  function handleUser() {
    getUserInfo(params.userId)
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => console.error(error))
  }

  React.useEffect(() => {
    handleUser()
  }, [])


  return (
    <UserContext.Provider value={[user, handleUser]}>
      {props.children}
    </UserContext.Provider>
  )
}