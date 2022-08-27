import React from "react";

interface MultiCorrectChoiceProps{
    choices : {
        key : boolean,
        name : string
    }[]
    handleChange : (index : number) => void
    checked : boolean[]
}

export default function MultiCorrectChoice({choices,handleChange,checked}:MultiCorrectChoiceProps){
    return(
        <div>
            <p>Richtige Antworten</p>
            {choices.map((value,index)=>{
                return <label key={index}>
                    <input type="checkbox" className="nes-checkbox" checked={checked[index]} onChange={()=>handleChange(index)}/>
                    <span>{value.name}</span>
                </label>
            })}
        </div>
    )
}