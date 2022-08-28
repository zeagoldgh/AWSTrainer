import {AnswersGiven, QuestionEntity} from "../../service/models";

interface QuestionButtonProps {
    index : number
    question : QuestionEntity
    currentQuestion : number
    givenAnswers : AnswersGiven
}
export default function QuestionButton({index, question, currentQuestion, givenAnswers}:QuestionButtonProps){

    const colorChecker = () =>{
        if (currentQuestion===index){
            return 'nes-btn is-primary'
        }
        if (question.indexRightAnswer.length===4){
            if (givenAnswers.givenAnswers.includes(true)){
                return 'nes-btn is-success'
            }
            return 'nes-btn'
        } else {
            const rightAnswers = question.indexRightAnswer.length
            const currentClicked = givenAnswers.givenAnswers.filter(answer => answer)
            if (currentClicked.length===rightAnswers){
                return 'nes-btn is-success'
            }
            return 'nes-btn'
        }
    }

    return(
        <button className={colorChecker()}>{index+1}</button>
    )
}