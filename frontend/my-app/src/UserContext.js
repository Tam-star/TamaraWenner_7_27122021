import React from 'react';
import { getUserConnectedInfo } from './API-functions/UserAPI-functions';

export const UserContext = React.createContext()


export const UserProvider = (props) => {
    const [user, setUser] = React.useState('')

    React.useEffect(() => {
        getUserConnectedInfo()
          .then((response) => {
            setUser(response.data)
            //console.log('useEffect used : '+ JSON.stringify(response.data))
          })
          .catch((error) => console.error(error))
      }, [])

    
    return(
        <UserContext.Provider value = {[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}