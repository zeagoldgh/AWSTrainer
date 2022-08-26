import React, {useState} from "react";
import LoginRegisterForm from "../components/LoginPage/LoginRegisterForm";
import Heading from "../components/Common/Heading";

export default function LoginPage() {

    const [registerForm, setRegisterForm] = useState(false)

    const toggle = () =>{
        setRegisterForm(!registerForm)
    }


    return (
        <div className="App">
            <Heading location={'login'}/>
            <LoginRegisterForm isRegister={registerForm} toggle={toggle}/>
            <button className={"nes-btn is-success"} onClick={toggle}>
                {registerForm?"Zum Login":"Zur Registrierung"}
            </button>
        </div>
    );
}