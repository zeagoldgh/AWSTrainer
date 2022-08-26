import TextArea from "./TextArea";
import React from "react";
import '../../font.css'

export default function AddQuestion(){
    return(
        <div>
            <label>
                <input type="checkbox" className="nes-checkbox" checked/>
                <span>Multiple Choice</span>
            </label>
            <TextArea/>
            <div className="nes-field">
                <label htmlFor="name_field">Antwort 1</label>
                <input type="text" id="name_field" className="nes-input betterRead"/>
            </div>
            <div className="nes-field">
                <label htmlFor="name_field">Antwort 2</label>
                <input type="text" id="name_field" className="nes-input betterRead"/>
            </div>
            <div className="nes-field">
                <label htmlFor="name_field">Antwort 3</label>
                <input type="text" id="name_field" className="nes-input betterRead"/>
            </div>
            <div className="nes-field">
                <label htmlFor="name_field">Antwort 4</label>
                <input type="text" id="name_field" className="nes-input betterRead"/>
            </div>
            <div className="nes-field">
                <label htmlFor="name_field">Antwort 5</label>
                <input type="text" id="name_field" className="nes-input betterRead"/>
            </div>
            <label htmlFor="success_select">Welche Prüfung?</label>
            <div className="nes-select is-success">
                <select required id="success_select">
                    <option value="" disabled selected hidden>Select...</option>
                    <option value="CLF-C01">CLF-C01</option>
                </select>
            </div>

            <label htmlFor="warning_select">Welche Kategorie?</label>
            <div className="nes-select is-warning">
                <select required id="warning_select">
                    <option value="" disabled selected hidden>Select...</option>
                    <option value="CLOUD">Cloud Concepts</option>
                    <option value="SECURITY">Security and Compliance</option>
                    <option value="BILLING">Billing & Pricing</option>
                    <option value="TECHNOLOGY">Technology</option>
                </select>
            </div>
            <label htmlFor="error_select">Richtige Antwort</label>
            <div className="nes-select is-error">
                <select required id="error_select">
                    <option value="" disabled selected hidden>Select...</option>
                    <option value="0">1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                    <option value="3">4</option>
                </select>
            </div>
            <button type="button" className="nes-btn is-success">Speichern</button>
        </div>
    )
}