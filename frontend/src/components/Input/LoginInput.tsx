import React from "react";

interface LoginInputProps{
    isPassword ?: boolean
    placeholder : string
    value : string
    onChange : (value:string) => void
}

export default function LoginInput(props:LoginInputProps){
    return(
        <div>
            <input
                className={"nes-input"}
                type={props.isPassword?"password":"text"}
                placeholder={props.placeholder}
                value={props.value}
                onChange={ev => props.onChange(ev.target.value)}
            />
        </div>
    )
}