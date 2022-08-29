import {AnswersGiven, QuestionEntity} from "../../service/models";

interface QuestionButtonProps {
    index : number
    question : QuestionEntity
    currentQuestion : number
    givenAnswers : AnswersGiven
    setIndex : (index : number) => void
}
export default function QuestionButton({index, question, currentQuestion, givenAnswers,setIndex}:QuestionButtonProps){

    const colorChecker = () =>{
        let css = 'nes-btn'
        if (currentQuestion===index){
            css += ' is-primary'
        } else if (question.rightAnswers.filter(answer => answer).length===4){
            if (givenAnswers.givenAnswers.includes(true)){
                css += ' is-success'
            }
        } else {
            const rightAnswers = question.rightAnswers.filter(answer => answer).length
            const currentClicked = givenAnswers.givenAnswers.filter(answer => answer)
            if (currentClicked.length===rightAnswers){
                css += ' is-success'
            }
        }
        return css
    }

    return(
        <button className={colorChecker()} onClick={()=> setIndex(index)}>{index+1<10 ? `0${index+1}` : index+1}</button>
    )
}