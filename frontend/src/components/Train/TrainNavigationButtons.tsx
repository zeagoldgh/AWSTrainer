import {QuestionEntity} from "../../service/models";
import './TrainNavigationButtons.css'

interface TrainNavigationButtonsProps{
    setIndex : (index : number) => void
    index : number
    questions : QuestionEntity[]
    percent : number
}

export default function TrainNavigationButtons({setIndex, index, questions, percent}:TrainNavigationButtonsProps){
    return(
        <div className={'flexNav'}>
            <button onClick={(()=>setIndex(index-1))} disabled={index===0}>prev</button>
            <button disabled={percent<99}>Absenden</button>
            <button onClick={(()=>setIndex(index+1))} disabled={index===questions.length-1}>next</button>
        </div>
    )
}