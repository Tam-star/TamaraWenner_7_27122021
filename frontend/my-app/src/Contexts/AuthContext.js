import React from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { getUserConnectedInfo } from '../API-functions/UserAPI-functions';

export const AuthContext = React.createContext()


export const AuthProvider = (props) => {
    const [auth, setAuth] = React.useState(false)

    const value = { auth, setAuth }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}


export function useAuthContext() {
    return React.useContext(AuthContext);
}

export function RequireAuth({ children }) {
    const { auth } = useAuthContext();
    const location = useLocation();

    console.log(auth)

    if (auth===false) {
         return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}
