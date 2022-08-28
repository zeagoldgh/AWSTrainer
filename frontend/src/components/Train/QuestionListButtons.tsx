import {AnswersGiven, QuestionEntity} from "../../service/models";
import QuestionButton from "./QuestionButton";

interface QuestionListButtonsProps{
    questions : QuestionEntity []
    currentQuestion : number
    givenAnswers : AnswersGiven[]
}

export default function QuestionListButtons({questions,currentQuestion,givenAnswers}: QuestionListButtonsProps){
    return(
        <div>
            {
                questions.map((q,i)=>{
                    return  <QuestionButton  key={i} index={i} question={q} currentQuestion={currentQuestion} givenAnswers={givenAnswers[i]}/>
                })
            }
        </div>
    )
}