import React from "react";
import {Link} from "react-router-dom";

interface ChooseButtonProps{
    color : string
    text : string
    destination : string
}

export default function ChooseButton({color,text,destination}:ChooseButtonProps){
    return(
        <Link to={destination}>
            <button type="button" className={`nes-btn is-${color}`}>{text}</button>
        </Link>
    )
}