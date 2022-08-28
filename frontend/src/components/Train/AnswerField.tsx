import SingleChoice from "./SingleChoice";
import MultiChoice from "./MultiChoice";

interface AnswerFieldProps{
    answers : string[]
    givenAnswers : boolean[]
    handleAnswer : (i : number) => void
}

export default function AnswerField({answers,givenAnswers,handleAnswer}:AnswerFieldProps){
    return(
        <div>
            {
                answers.length===4 ?
                    <SingleChoice answers={answers} givenAnswers={givenAnswers} handleAnswer={handleAnswer}/>
                    :
                    <MultiChoice answers={answers} givenAnswers={givenAnswers} handleAnswer={handleAnswer}/>
            }
        </div>
    )
}