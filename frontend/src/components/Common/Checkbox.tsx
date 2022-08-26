import React from "react";

interface CheckboxProps{
    toggle : ()=>void,
    text : string,
    isChecked : boolean
}

export default function Checkbox({toggle,text,isChecked}:CheckboxProps){
    return(
        <div onClick={toggle}>
            <input
                type="checkbox"
                className="nes-checkbox"
                checked={isChecked}
                readOnly
            />
            <span>{text}</span>
        </div>
    )
}