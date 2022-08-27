import React from "react";

interface SelectorsCreateProps{
    label : string
    options : {
        key : string,
        name : string
    }[]
    value : string
    color : string
    handleChange : (value:string)=>void
}

export default function SelectorsCreate({label,options,value,handleChange,color}:SelectorsCreateProps){
    return(
        <div>
            <label htmlFor="success_select">{label}</label>
            <div className={`nes-select is-${color}`}>
                <select required id={`success_select_${label}`} defaultValue={value} onSelect={event => handleChange(event.currentTarget.value)}>
                    <option value="nope" disabled hidden>Select...</option>
                    {
                        options.map((option ,index) => <
                            option value={option.key} key={index}>{option.name}</option>)
                    }
                </select>
            </div>
        </div>
    )
}