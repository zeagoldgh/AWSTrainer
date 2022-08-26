import React from "react";

interface InputQuestionProps{
    index : number
    text : string
    handleChange : (text:string,index:number)=>void
}

export default function InputQuestion(props:InputQuestionProps){
    return(
        <div>
            <div className="nes-field">
                <label htmlFor="name_field">{`Antwort ${props.index+1}`}</label>
                <input type="text" id={`name_field_${props.index}`} className="nes-input betterRead" value={props.text} onChange={ev =>props.handleChange(ev.target.value, props.index)}/>
            </div>
        </div>
    )
}