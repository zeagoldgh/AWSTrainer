import LoginInput from "../Input/LoginInput";
import SubmitButton from "../Buttons/SubmitButton";
import React, {FormEvent, useState} from "react";
import axios from "axios";
import {loginUser} from "../../service/apiService";

interface LoginRegisterFormProps{
    isRegister : boolean
}

export default function LoginRegisterForm({isRegister}:LoginRegisterFormProps){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')
    const [token, setToken] = useState('')
    const [error, setError] = useState('')

    const createUser = (event : FormEvent) => {
        event.preventDefault()
        setError('')
        if (!(password===passwordTwo) || password.length<5){
            setError("Passwörter nicht identisch oder zu kurz")
        } else {
            axios.post(`/api/user`,
                {'username':username, 'password':password})
                .then(response => response.data)
                .catch(e => {
                    if (e.response.status===400){
                        setError("Name schon vergeben")
                    } else {
                        setError(e.message)
                    }
                })
            setUsername('')
            setPassword('')
            setPasswordTwo('')
        }

    }

    const login = (event : FormEvent) => {
        event.preventDefault()
        setError('')
        loginUser(username,password)
            .then(data => setToken(data.token))
            .catch(e => setError(e.message))
        setUsername('')
        setPassword('')
    }


    return(
        <div>
            <h2 className={"nes-text is-primary"}>{isRegister?"Register":"Login"}</h2>
            <form onSubmit={isRegister?createUser:login}>
                <LoginInput
                    placeholder={'Dein Nutzername'}
                    value={username}
                    onChange={setUsername}
                />
                <LoginInput
                    isPassword
                    placeholder={'Passwort'}
                    value={password}
                    onChange={setPassword}
                />
                {isRegister && <LoginInput
                    isPassword
                    placeholder={'Passwort wiederholen'}
                    value={passwordTwo}
                    onChange={setPasswordTwo}
                />}
                <SubmitButton text={isRegister?"Registrieren":"Login"}/>
            </form>
            {error && <h1 className={"nes-text is-error"}>{error}</h1>}
        </div>
    )
}