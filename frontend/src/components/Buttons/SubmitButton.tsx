import React from "react";
import './SubmitButton.css'

interface SubmitButtonProps{
    text : string
}

export default function SubmitButton({text}:SubmitButtonProps){
    return(
        <div>
            <button type='submit' className={"nes-btn is-primary button"}>{text}</button>
        </div>
    )
}