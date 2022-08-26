import React, {useState} from "react";
import LoginRegisterForm from "../components/LoginPage/LoginRegisterForm";

export default function LoginPage() {

    const [registerForm, setRegisterForm] = useState(false)

    const toggle = () =>{
        setRegisterForm(!registerForm)
    }


    return (
        <div className="App">
            <LoginRegisterForm isRegister={registerForm}/>
            <button className={"nes-btn is-success"} onClick={toggle}>
                {registerForm?"Zum Login":"Zur Registrierung"}
            </button>
        </div>
    );
}