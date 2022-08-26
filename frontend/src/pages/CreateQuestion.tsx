import Heading from "../components/Common/Heading";
import React from "react";
import '../font.css'


export default function CreateQuestion(){
    return(
        <div>
            <Heading location={"add"}/>
            <label htmlFor="textarea_field betterRead">Textarea</label>
            <textarea id="textarea_field" className="nes-textarea betterRead"></textarea>
            <div className="nes-field">
                <label htmlFor="name_field">Your name</label>
                <input type="text" id="name_field" className="nes-input betterRead"/>
            </div>
            <div className="nes-field">
                <label htmlFor="name_field">Your name</label>
                <input type="text" id="name_field" className="nes-input betterRead"/>
            </div>
            <div className="nes-field">
                <label htmlFor="name_field">Your name</label>
                <input type="text" id="name_field" className="nes-input betterRead"/>
            </div>
            <div className="nes-field">
                <label htmlFor="name_field">Your name</label>
                <input type="text" id="name_field" className="nes-input betterRead"/>
            </div>
            <div className="nes-field">
                <label htmlFor="name_field">Your name</label>
                <input type="text" id="name_field" className="nes-input betterRead"/>
            </div>
            <label htmlFor="success_select">nes-select.is-success</label>
            <div className="nes-select is-success">
                <select required id="success_select">
                    <option value="" disabled selected hidden>Select...</option>
                    <option value="0">To be</option>
                    <option value="1">Not to be</option>
                </select>
            </div>

            <label htmlFor="warning_select">nes-select.is-warning</label>
            <div className="nes-select is-warning">
                <select required id="warning_select">
                    <option value="" disabled selected hidden>Select...</option>
                    <option value="0">To be</option>
                    <option value="1">Not to be</option>
                </select>
            </div>
            <label htmlFor="error_select">nes-select.is-error</label>
            <div className="nes-select is-error">
                <select required id="error_select">
                    <option value="" disabled selected hidden>Select...</option>
                    <option value="0">To be</option>
                    <option value="1">Not to be</option>
                </select>
            </div>
        </div>
    )
}