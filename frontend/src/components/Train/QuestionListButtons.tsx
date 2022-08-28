import {AnswersGiven, QuestionEntity} from "../../service/models";
import QuestionButton from "./QuestionButton";
import './QuestionListButtons.css'

interface QuestionListButtonsProps {
    questions: QuestionEntity []
    currentQuestion: number
    givenAnswers: AnswersGiven[]
    setIndex: (index: number) => void
}

export default function QuestionListButtons({
                                                questions,
                                                currentQuestion,
                                                givenAnswers,
                                                setIndex
                                            }: QuestionListButtonsProps) {
    return (
        <div className={'flex'}>
            {
                questions.map((q, i) => {
                    return <QuestionButton key={i} index={i} question={q} currentQuestion={currentQuestion}
                                           givenAnswers={givenAnswers[i]} setIndex={setIndex}/>
                })
            }
        </div>
    )
}