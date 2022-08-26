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
        <div className={'loginInput '}>
            <div className="nes-field">
                <label htmlFor="name_field">{props.placeholder}</label>
                <input
                    id="name_field"
                    className={"nes-input"}
                    type={props.isPassword?"password":"text"}
                    value={props.value}
                    onChange={ev => props.onChange(ev.target.value)}
                />
            </div>

        </div>
    )
}