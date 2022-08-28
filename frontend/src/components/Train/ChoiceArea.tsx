import ChoiceButton from "./ChoiceButton";

interface SingleChoiceProps{
    answers : string[]
    givenAnswers : boolean[]
    handleAnswer : (i : number) => void
}

export default function ChoiceArea({answers,givenAnswers,handleAnswer}:SingleChoiceProps){
    return(
        <div>
            {
                answers.map((answer,i)=>{
                    return <ChoiceButton key={i+(givenAnswers[i] ? 'a' : 'b')} answer={answer} clicked={givenAnswers[i]} handleClick={()=>handleAnswer(i)}/>

                })
            }
        </div>
    )
}