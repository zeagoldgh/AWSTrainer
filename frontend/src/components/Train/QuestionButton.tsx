import {AnswersGiven, QuestionEntity} from "../../service/models";

interface QuestionButtonProps {
    index : number
    question : QuestionEntity
    currentQuestion : number
    givenAnswers : AnswersGiven
}
export default function QuestionButton({index, question, currentQuestion, givenAnswers}:QuestionButtonProps){

    const colorChecker = () =>{
        let css = 'nes-btn'
        if (currentQuestion===index){
            css += ' is-primary'
        } else if (question.indexRightAnswer.length===4){
            if (givenAnswers.givenAnswers.includes(true)){
                css += ' is-success'
            }
        } else {
            const rightAnswers = question.indexRightAnswer.length
            const currentClicked = givenAnswers.givenAnswers.filter(answer => answer)
            if (currentClicked.length===rightAnswers){
                css += ' is-success'
            }
        }
        return css
    }

    return(
        <button className={colorChecker()}>{index+1}</button>
    )
}