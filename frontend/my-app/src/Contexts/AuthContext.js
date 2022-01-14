import React from 'react';
import { useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import { getUserInfo } from '../API-functions/UserAPI-functions';

export const AuthContext = React.createContext()


export const AuthProvider = (props) => {

    const [auth, setAuth] = React.useState(false)

    const checkedAuthentication = () => {
        setAuth(true)
    }

    console.log('AuthProvider')
    const value = { auth, setAuth, checkedAuthentication }

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
    const { auth, checkedAuthentication } = useAuthContext();
    const location = useLocation();
    const params = useParams()
    const navigate = useNavigate()

    console.log('Require Auth')
    React.useEffect(() => {
        //It is going to check if the token belongs to the same user as the profile he tries to access
        if (params.userId) {
            getUserInfo(params.userId)
                .then((response) => {
                    if (response.data.sameUser) {
                        checkedAuthentication()
                        navigate(location) //On retourne à l'endroit voulu
                    }
                })
                .catch(() => console.log('something went wrong'))
        }
    }, [])

    if (auth === false) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;

}
