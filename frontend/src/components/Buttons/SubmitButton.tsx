import React from "react";

interface SubmitButtonProps{
    text : string
}

export default function SubmitButton({text}:SubmitButtonProps){
    return(
        <div>
            <button type='submit' className={"nes-btn is-primary"}>{text}</button>
        </div>
    )
}