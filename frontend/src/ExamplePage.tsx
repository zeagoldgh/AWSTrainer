import React, {FormEvent, useState} from "react";
import axios from "axios";

export default function ExamplePage(){
    const [newUsername, setNewUsername] = useState('')
    const [newPasswordOne, setNewPasswordOne] = useState('')
    const [newPasswordTwo, setNewPasswordTwo] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [checker, setChecker] = useState('')
    const [error, setError] = useState('')


    const createUser = (event : FormEvent) => {
        event.preventDefault()
        setError('')
        if (!(newPasswordOne===newPasswordTwo) || newPasswordOne.length<5){
            setError("Passwörter nicht identisch oder zu kurz")
        } else {
            axios.post(`/api/user`,
                {'username':newUsername, 'password':newPasswordOne})
                .then(response => response.data)
                .catch(e => {
                    if (e.response.status===400){
                        setError("Name schon vergeben")
                    } else {
                        setError(e.message)
                    }
                })
            setNewUsername('')
            setNewPasswordOne('')
            setNewPasswordTwo('')
        }

    }

    const login = (event : FormEvent) => {
        event.preventDefault()
        setError('')
        axios.post(`/auth`, {'username':username, 'password':password})
            .then(response => response.data)
            .then(data => setToken(data.token))
            .catch(e => setError(e.message))
        setUsername('')
        setPassword('')
    }


    const getInfos = () => {
        axios.get(`/api/user/me`,
            {headers: {
                    Authorization: `Bearer ${token}`,
                }}
        )
            .then(response => response.data)
            .then(data => setChecker(data.username))
            .catch(e => setError(e.message))
    }


    return (
        <div className="App">
            <h2>Register</h2>
            <form onSubmit={createUser}>
                <input type="text" placeholder={'Dein Nutzername'} value={newUsername} onChange={ev => setNewUsername(ev.target.value)}/>
                <input type="password" placeholder={'Passwort'} value={newPasswordOne} onChange={ev => setNewPasswordOne(ev.target.value)}/>
                <input type="password" placeholder={'Passwort wiederholen'} value={newPasswordTwo} onChange={ev => setNewPasswordTwo(ev.target.value)}/>
                <button type='submit'>Registrieren</button>
            </form>
            <h2>Login</h2>
            <form onSubmit={login}>
                <input type="text" placeholder={'Nutzername'} value={username} onChange={ev => setUsername(ev.target.value)}/>
                <input type="password" placeholder={'Passwort'} value={password} onChange={ev => setPassword(ev.target.value)}/>
                <button type='submit'>Login</button>
            </form>
            {error && <h1>{error}</h1>}
            {token && <div>
                <button onClick={getInfos}>Eingeloggt, versuch es!</button>
                <p>wenn alles klappt ist hier dein Username: {checker && checker}</p>
            </div>}
        </div>
    );
}