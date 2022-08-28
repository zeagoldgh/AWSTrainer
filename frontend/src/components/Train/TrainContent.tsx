import {useEffect, useState} from "react";
import {AnswersGiven, QuestionEntity} from "../../service/models";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/AuthProvider";
import QuestionBox from "./QuestionBox";
import ChoiceArea from "./ChoiceArea";
import QuestionListButtons from "./QuestionListButtons";
import TrainNavigationButtons from "./TrainNavigationButtons";
import ProgressBar from "./ProgressBar";


interface TrainContentProps {
    fetch: (token: string) => Promise<QuestionEntity[]>
}

export default function TrainContent({fetch}: TrainContentProps) {

    const [questions, setQuestions] = useState<QuestionEntity[]>()
    const [index, setIndex] = useState(0)
    const [givenAnswers, setGivenAnswers] = useState<AnswersGiven[]>([])

    const nav = useNavigate()
    const {token} = useAuth()

    useEffect(() => {
        const givenAnswersInitArr = [] as AnswersGiven[]
        fetch(token)
            .then(data => {
                setQuestions(data)
                data.map(((question) => {
                    const givenAnswerInit = {} as AnswersGiven
                    givenAnswerInit.givenAnswers = []
                    givenAnswerInit.questionId = question.id
                    givenAnswerInit.givenAnswers = question.answers.length === 4 ? [false, false, false, false] : [false, false, false, false, false]
                    givenAnswersInitArr.push(givenAnswerInit)
                    return givenAnswerInit
                }))
            })
            .then(() => setGivenAnswers(givenAnswersInitArr))
            .catch((err: AxiosError) => {
                if (err.response?.status === 401) {
                    nav("/login")
                } else {
                    console.log(err.message)
                }
            })
    }, [nav, token, fetch])

    const handleAnswer = (whichAnswer: number) => {
        const currentAnswers = [...givenAnswers]
        if (currentAnswers[index].givenAnswers.length === 4) {
            currentAnswers[index].givenAnswers = [false, false, false, false]
        }
        currentAnswers[index].givenAnswers[whichAnswer] = !currentAnswers[index].givenAnswers[whichAnswer]
        setGivenAnswers(currentAnswers)
    }

    const getPercentage = () => {
        if (questions) {
            const total = questions?.length
            let questionsAnswerd = 0
            for (let i = 0; i < givenAnswers.length; i++) {
                if (givenAnswers[i].givenAnswers.length === 4 && givenAnswers[i].givenAnswers.includes(true)) {
                    questionsAnswerd++
                } else {
                    const answered = givenAnswers[i].givenAnswers.filter(answer => answer)
                    if (questions[i].indexRightAnswer.length===answered.length) {
                        questionsAnswerd++
                    }
                }
            }
            return questionsAnswerd/total*100
        }
        return 0
    }

    return (
        <div>
            {
                questions && givenAnswers.length > 3 ?
                    <div>
                        <QuestionBox text={questions[index].question}
                                     toChoose={questions[index].answers.length === 5 ? questions[index].indexRightAnswer.length : 1}/>
                        <ChoiceArea answers={questions[index].answers} givenAnswers={givenAnswers[index].givenAnswers}
                                    handleAnswer={handleAnswer}/>
                        <TrainNavigationButtons index={index} setIndex={setIndex} questions={questions} percent={getPercentage()}/>
                        <ProgressBar currentPercent={getPercentage()}/>
                        <QuestionListButtons questions={questions} currentQuestion={index} givenAnswers={givenAnswers} setIndex={setIndex}/>
                    </div>
                    :
                    <i className="nes-kirby"></i>
            }

        </div>
    )
}