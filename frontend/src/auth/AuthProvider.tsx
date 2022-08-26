import {ReactNode, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {JwtToken} from "../service/models";
import {loginUser} from "../service/apiService";

export default function AuthProvider({children}:{children :ReactNode}) {
    const nav = useNavigate()
    const [token, setToken] = useState(localStorage.getItem('jwt') ?? '')
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (token) {
            localStorage.setItem('jwt',token)
            const decodeJWT : JwtToken = jwtDecode(token)
            if (decodeJWT.exp<Date.now()/1000){
                localStorage.removeItem('jwt')
                setToken('')
            }
            setUsername(decodeJWT.sub);
        } else {
            nav('/login')
        }
    }, [token, nav])


    const logout = () => {
        localStorage.removeItem('jwt')
        setToken('')
        setUsername('')
    }

    const login = (username: string, password: string) => {
        return loginUser(username,password)
            .then(data => setToken(data.token))
    }

    return <AuthContext.Provider value={{token, username, logout, login}} >{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext)