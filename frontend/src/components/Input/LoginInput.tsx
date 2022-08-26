import React from "react";
import './LoginInput.css';

interface LoginInputProps{
    isPassword ?: boolean
    placeholder : string
    value : string
    onChange : (value:string) => void
}

export default function LoginInput(props:LoginInputProps){
    return(
        <div className={'loginInput'}>
            <input
                className={"nes-input textInput"}
                type={props.isPassword?"password":"text"}
                placeholder={props.placeholder}
                value={props.value}
                onChange={ev => props.onChange(ev.target.value)}
            />
        </div>
    )
}