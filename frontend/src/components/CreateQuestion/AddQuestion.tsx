import TextArea from "./TextArea";
import React, {useState} from "react";
import '../../font.css'
import './AddQuestion.css'
import Checkbox from "../Common/Checkbox";
import InputQuestion from "./InputQuestion";

export default function AddQuestion(){

    const [multi, setMulti] = useState(false)
    const [question, setQuestion] = useState('')
    const [singleAnswers, setSingleAnswers] = useState<string[]>(["","","",""])
    const [multiAnswers, setMultiAnswers] = useState<string[]>(["","","","",""])


    const handleChange = (text : string, index : number)=>{
        if (multi){
            let answers = [...multiAnswers]
            answers[index] = text
            setMultiAnswers(answers)
        } else {
            let answers = [...singleAnswers]
            answers[index] = text
            setSingleAnswers(answers)
        }

    }


    return(
        <div className={'addQuestion'}>
            <Checkbox text={'Multiple Choice?'} isChecked={multi} toggle={()=>setMulti(!multi)}/>
            <TextArea value={question} onChange={setQuestion}/>
            {
                multi
                ?
                    multiAnswers.map((answer : string,index : number)=><InputQuestion key={`${index}_multi`} index={index} text={answer} handleChange={handleChange}/>)
                    :
                    singleAnswers.map((answer : string,index : number)=><InputQuestion key={`${index}_single`} index={index} text={answer} handleChange={handleChange}/>)
            }
            <label htmlFor="success_select">Welche Prüfung?</label>
            <div className="nes-select is-success">
                <select required id="success_select" defaultValue={"nope"}>
                    <option value="nope" disabled hidden>Select...</option>
                    <option value="CLF-C01">CLF-C01</option>
                </select>
            </div>

            <label htmlFor="warning_select">Welche Kategorie?</label>
            <div className="nes-select is-warning">
                <select required id="warning_select" defaultValue={"nope"}>
                    <option value="nope" disabled hidden>Select...</option>
                    <option value="CLOUD">Cloud Concepts</option>
                    <option value="SECURITY">Security and Compliance</option>
                    <option value="BILLING">Billing & Pricing</option>
                    <option value="TECHNOLOGY">Technology</option>
                </select>
            </div>
            {
                multi
                ?
                    <div>

                    </div>
                    :
                    <div>
                        <label htmlFor="error_select">Richtige Antwort</label>
                        <div className="nes-select is-error">
                            <select required id="error_select" defaultValue={"nope"}>
                                <option value="nope" disabled hidden>Select...</option>
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                            </select>
                        </div>
                    </div>
            }
            <button type="button" className="nes-btn is-success">Speichern</button>
        </div>
    )
}