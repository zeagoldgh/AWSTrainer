import React from "react";

interface TextAreaProps{
    value : string,
    onChange : (text : string) => void
}

export default function TextArea({value,onChange}:TextAreaProps){
    return(
        <div>
            <label htmlFor="textarea_field betterRead">Frage</label>
            <textarea id="textarea_field" className="nes-textarea betterRead" value={value} onChange={ev => onChange(ev.target.value)}></textarea>
        </div>
    )
}