import SingleChoiceButton from "./SingleChoiceButton";

interface SingleChoiceProps{
    answers : string[]
    givenAnswers : boolean[]
    handleAnswer : (i : number) => void
}

export default function SingleChoice({answers,givenAnswers,handleAnswer}:SingleChoiceProps){
    return(
        <div>
            {
                answers.map((answer,i)=>{
                    return <SingleChoiceButton key={i+(givenAnswers[i] ? 'a' : 'b')} answer={answer} clicked={givenAnswers[i]} handleClick={()=>handleAnswer(i)}/>

                })
            }
        </div>
    )
}