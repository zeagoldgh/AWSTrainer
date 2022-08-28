import ChoiceButton from "./ChoiceButton";
import './ChoiceArea.css'

interface SingleChoiceProps{
    answers : string[]
    givenAnswers : boolean[]
    handleAnswer : (i : number) => void
}

export default function ChoiceArea({answers,givenAnswers,handleAnswer}:SingleChoiceProps){
    return(
        <div className={'flexChoice'}>
            {
                answers.map((answer,i)=>{
                    return <ChoiceButton key={i+(givenAnswers[i] ? 'a' : 'b')} answer={answer} clicked={givenAnswers[i]} handleClick={()=>handleAnswer(i)}/>

                })
            }
        </div>
    )
}