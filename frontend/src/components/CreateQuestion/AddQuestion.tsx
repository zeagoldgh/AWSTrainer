import TextArea from "./TextArea";
import React, {useState} from "react";
import '../../font.css'
import './AddQuestion.css'
import Checkbox from "../Common/Checkbox";
import InputQuestion from "./InputQuestion";
import SelectorsCreate from "./SelectorsCreate";
import {exams,categories,singleAnswerChoice} from "../../service/data";

export default function AddQuestion(){

    const [multi, setMulti] = useState(false)
    const [question, setQuestion] = useState('')
    const [multiAnswers, setMultiAnswers] = useState<string[]>(["","","","",""])
    const [singleAnswers, setSingleAnswers] = useState<string[]>(["","","",""])
    const [exam , setExam] = useState("nope")
    const [category, setCategory] = useState("nope")
    const [correctSingle , setCorrectSingle] = useState("nope")
    const [correctMulti , setCorrectMulti] = useState("nope")


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
            {multi ?
                    multiAnswers.map((answer : string,index : number)=><InputQuestion key={`${index}_multi`} index={index} text={answer} handleChange={handleChange}/>)
                    :
                    singleAnswers.map((answer : string,index : number)=><InputQuestion key={`${index}_single`} index={index} text={answer} handleChange={handleChange}/>)
            }
            <SelectorsCreate label={"Welche Prüfung?"} color={'success'} options={exams} value={exam} handleChange={setExam}/>
            <SelectorsCreate label={"Welche Kategorie?"} color={'warning'} options={categories} value={category} handleChange={setCategory}/>
            {multi ?
                    <div></div>
                    :
                    <SelectorsCreate label={"Richtige Antwort"} options={singleAnswerChoice} value={correctSingle} color={"error"} handleChange={setCorrectSingle}/>
            }
            <button type="button" className="nes-btn is-success">Speichern</button>
        </div>
    )
}