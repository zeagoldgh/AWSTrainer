import LoginInput from "../Input/LoginInput";
import SubmitButton from "../Buttons/SubmitButton";
import React, {FormEvent, useState} from "react";
import axios from "axios";
import {useAuth} from "../../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../../service/apiService";

interface LoginRegisterFormProps{
    isRegister : boolean
    toggle : ()=>void
}

export default function LoginRegisterForm({isRegister,toggle}:LoginRegisterFormProps){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')
    const [error, setError] = useState('')

    const auth = useAuth()
    const nav = useNavigate()

    const createUser = (event : FormEvent) => {
        event.preventDefault()
        setError('')
        if (!(password===passwordTwo) || password.length<5){
            setError("Passwörter nicht identisch oder zu kurz")
        } else {
            registerUser(username,password,passwordTwo)
                .catch(e => {
                    if (e.response.status===400){
                        setError("Name schon vergeben")
                    } else {
                        setError(e.message)
                    }
                })
            setPasswordTwo('')
            toggle()
        }

    }

    const login = (event : FormEvent) => {
        event.preventDefault()
        setError('')
        auth.login(username,password)
            .then(()=>nav("/"))
            .catch(e => setError(e.message))
        setUsername('')
        setPassword('')
    }


    return(
        <div>
            <h2 className={"nes-text is-primary"}>{isRegister?"Register":"Login"}</h2>
            <form onSubmit={isRegister?createUser:login}>
                <LoginInput
                    placeholder={'Nutzername'}
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
                        placeholder={'Wiederholen'}
                        value={passwordTwo}
                        onChange={setPasswordTwo}
                    />}
                    <SubmitButton text={isRegister?"Registrieren":"Login"}/>
            </form>
            {error && <h1 className={"nes-text is-error"}>{error}</h1>}
        </div>
    )
}